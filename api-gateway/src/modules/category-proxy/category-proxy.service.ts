import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { API_CONSTANTS } from '../../common/constants';

export interface CategoryItem {
  slug: string;
  title: string;
  navigation_slug: string;
  product_count?: number;
  url?: string;
  last_scraped_at?: string;
}

@Injectable()
export class CategoryProxyService {
  private readonly logger = new Logger(CategoryProxyService.name);

  constructor(private readonly httpService: HttpService) {}

  async findByNavigationSlug(navigationSlug: string): Promise<CategoryItem[]> {
    try {
      const response = await this.httpService.get(
        `${API_CONSTANTS.SCRAPER_SERVICE_BASE_URL}/categories/navigation/${navigationSlug}`,
        { timeout: API_CONSTANTS.DEFAULT_TIMEOUT }
      ).toPromise();
      return response.data as CategoryItem[];
    } catch (error) {
      this.logger.error(`Failed to fetch categories: ${error.message}`);
      throw error;
    }
  }

  async findBySlug(slug: string): Promise<CategoryItem> {
    try {
      const response = await this.httpService.get(
        `${API_CONSTANTS.SCRAPER_SERVICE_BASE_URL}/categories/${slug}`,
        { timeout: API_CONSTANTS.DEFAULT_TIMEOUT }
      ).toPromise();
      return response.data as CategoryItem;
    } catch (error) {
      this.logger.error(`Failed to fetch category ${slug}: ${error.message}`);
      throw error;
    }
  }
}
