import { Injectable, Logger } from '@nestjs/common';
import { PlaywrightCrawler } from 'crawlee';
import { SCRAPING_CONSTANTS } from '../../common/constants';
import { delay, extractNumber, cleanText, generateSourceId } from '../../common/utils';

export interface ScrapedProduct {
  title: string;
  price: number;
  currency: string;
  image_url: string;
  source_url: string;
  source_id: string;
}

export interface ScrapedNavigation {
  title: string;
  slug: string;
  url: string;
}

export interface ScrapedCategory {
  title: string;
  slug: string;
  url: string;
  navigation_slug: string;
}

@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);

  /* -------------------- NAVIGATION -------------------- */

  async scrapeNavigation(url: string): Promise<ScrapedNavigation[]> {
    this.logger.log(`Scraping navigation: ${url}`);

    const results: ScrapedNavigation[] = [];

    const crawler = new PlaywrightCrawler({
      maxConcurrency: SCRAPING_CONSTANTS.MAX_CONCURRENCY,
      requestHandlerTimeoutSecs: SCRAPING_CONSTANTS.REQUEST_TIMEOUT / 1000,

      launchContext: {
        launchOptions: {
          headless: true,
          args: ['--disable-blink-features=AutomationControlled'],
        },
      },

      preNavigationHooks: [
        async ({ page }) => {
          await page.setExtraHTTPHeaders({
            'User-Agent': SCRAPING_CONSTANTS.USER_AGENT,
          });
        },
      ],

      requestHandler: async ({ page }) => {
        await delay(SCRAPING_CONSTANTS.DELAY_BETWEEN_REQUESTS);

        const navigation = await page.evaluate(() => {
          const links = document.querySelectorAll('nav a');
          return Array.from(links)
            .map((a) => ({
              title: a.textContent?.trim() || '',
              url: (a as HTMLAnchorElement).href,
              slug: (a as HTMLAnchorElement).href.split('/').pop() || '',
            }))
            .filter((n) => n.title && n.url);
        });

        results.push(...navigation);
      },

      failedRequestHandler: async ({ request, error }) => {
        const message = error instanceof Error ? error.message : 'Unknown error';
        this.logger.error(`Navigation scrape failed: ${request.url} - ${message}`);
      },
    });

    await crawler.run([url]);
    return results;
  }

  /* -------------------- CATEGORIES -------------------- */

  async scrapeCategories(
    navigationSlug: string,
    url: string,
  ): Promise<ScrapedCategory[]> {
    this.logger.log(`Scraping categories for ${navigationSlug}`);

    const results: ScrapedCategory[] = [];

    const crawler = new PlaywrightCrawler({
      maxConcurrency: SCRAPING_CONSTANTS.MAX_CONCURRENCY,
      requestHandlerTimeoutSecs: SCRAPING_CONSTANTS.REQUEST_TIMEOUT / 1000,

      launchContext: {
        launchOptions: {
          headless: true,
        },
      },

      preNavigationHooks: [
        async ({ page }) => {
          await page.setExtraHTTPHeaders({
            'User-Agent': SCRAPING_CONSTANTS.USER_AGENT,
          });
        },
      ],

      requestHandler: async ({ page }) => {
        await delay(SCRAPING_CONSTANTS.DELAY_BETWEEN_REQUESTS);

        const categories = await page.evaluate((navSlug) => {
          const items = document.querySelectorAll('.category a, .subcategory a');
          return Array.from(items)
            .map((a) => ({
              title: a.textContent?.trim() || '',
              url: (a as HTMLAnchorElement).href,
              slug: (a as HTMLAnchorElement).href.split('/').pop() || '',
              navigation_slug: navSlug,
            }))
            .filter((c) => c.title && c.url);
        }, navigationSlug);

        results.push(...categories);
      },

      failedRequestHandler: async ({ request, error }) => {
        const message = error instanceof Error ? error.message : 'Unknown error';
        this.logger.error(`Category scrape failed: ${request.url} - ${message}`);
      },
    });

    await crawler.run([url]);
    return results;
  }

  /* -------------------- PRODUCTS -------------------- */

  async scrapeProducts(
    categorySlug: string,
    navigationSlug: string,
    url: string,
  ): Promise<ScrapedProduct[]> {
    this.logger.log(`Scraping products for ${categorySlug}`);

    const results: ScrapedProduct[] = [];

    const crawler = new PlaywrightCrawler({
      maxConcurrency: SCRAPING_CONSTANTS.MAX_CONCURRENCY,
      requestHandlerTimeoutSecs: SCRAPING_CONSTANTS.REQUEST_TIMEOUT / 1000,

      launchContext: {
        launchOptions: {
          headless: true,
        },
      },

      preNavigationHooks: [
        async ({ page }) => {
          await page.setExtraHTTPHeaders({
            'User-Agent': SCRAPING_CONSTANTS.USER_AGENT,
          });
        },
      ],

      requestHandler: async ({ page }) => {
        await delay(SCRAPING_CONSTANTS.DELAY_BETWEEN_REQUESTS);

        const products = await page.evaluate(() => {
          const cards = document.querySelectorAll('.product-card, .book-item');
          return Array.from(cards)
            .map((card) => {
              const title = card.querySelector('h3, h4')?.textContent || '';
              const priceText = card.querySelector('.price')?.textContent || '';
              const img = card.querySelector('img') as HTMLImageElement | null;
              const link = card.querySelector('a') as HTMLAnchorElement | null;

              const sourceUrl = link?.href || '';

              return {
                title: title.trim(),
                price: extractNumber(priceText),
                currency: 'GBP',
                image_url: img?.src || '',
                source_url: sourceUrl,
                source_id: sourceUrl ? generateSourceId(sourceUrl) : '',
              };
            })
            .filter((p) => p.title && p.source_url);
        });

        results.push(...products);
      },

      failedRequestHandler: async ({ request, error }) => {
        const message = error instanceof Error ? error.message : 'Unknown error';
        this.logger.error(`Product scrape failed: ${request.url} - ${message}`);
      },
    });

    await crawler.run([url]);
    return results;
  }

  /* -------------------- PRODUCT DETAIL -------------------- */

  async scrapeProductDetail(sourceUrl: string): Promise<any> {
    this.logger.log(`Scraping product detail: ${sourceUrl}`);

    let result: any = null;

    const crawler = new PlaywrightCrawler({
      maxConcurrency: 1,
      requestHandlerTimeoutSecs: SCRAPING_CONSTANTS.REQUEST_TIMEOUT / 1000,

      launchContext: {
        launchOptions: {
          headless: true,
        },
      },

      preNavigationHooks: [
        async ({ page }) => {
          await page.setExtraHTTPHeaders({
            'User-Agent': SCRAPING_CONSTANTS.USER_AGENT,
          });
        },
      ],

      requestHandler: async ({ page }) => {
        await delay(SCRAPING_CONSTANTS.DELAY_BETWEEN_REQUESTS);

        result = await page.evaluate(() => {
          const getText = (selector: string) =>
            document.querySelector(selector)?.textContent?.trim() || '';

          const priceText = getText('.price');

          return {
            title: getText('h1'),
            author: getText('.author'),
            isbn: getText('.isbn'),
            publisher: getText('.publisher'),
            description: getText('.description'),
            price: extractNumber(priceText),
            currency: 'GBP',
            image_url:
              (document.querySelector('.product-image img') as HTMLImageElement)
                ?.src || '',
            source_url: window.location.href,
            source_id: generateSourceId(window.location.href),
          };
        });
      },

      failedRequestHandler: async ({ request, error }) => {
        const message = error instanceof Error ? error.message : 'Unknown error';
        this.logger.error(`Detail scrape failed: ${request.url} - ${message}`);
      },
    });

    await crawler.run([sourceUrl]);
    return result;
  }
}
