import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { API_CONSTANTS } from '../../common/constants';

export interface NavigationItem {
  slug: string;
  title: string;
  url?: string;
  last_scraped_at?: string;
}

@Injectable()
export class NavigationProxyService {
  private readonly logger = new Logger(NavigationProxyService.name);

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<NavigationItem[]> {
    try {
      const response = await this.httpService.get(
        `${API_CONSTANTS.SCRAPER_SERVICE_BASE_URL}/navigation`,
        { timeout: API_CONSTANTS.DEFAULT_TIMEOUT }
      ).toPromise();
      return response.data as NavigationItem[];
    } catch (error) {
      this.logger.error(`Failed to fetch navigation: ${error.message}`);
      throw error;
    }
  }

  async findBySlug(slug: string): Promise<NavigationItem> {
    try {
      const response = await this.httpService.get(
        `${API_CONSTANTS.SCRAPER_SERVICE_BASE_URL}/navigation/${slug}`,
        { timeout: API_CONSTANTS.DEFAULT_TIMEOUT }
      ).toPromise();
      return response.data as NavigationItem;
    } catch (error) {
      this.logger.error(`Failed to fetch navigation ${slug}: ${error.message}`);
      throw error;
    }
  }

  async refreshNavigation(): Promise<{ message: string }> {
    try {
      const response = await this.httpService.post(
        `${API_CONSTANTS.SCRAPER_SERVICE_BASE_URL}/navigation/refresh`,
        {},
        { timeout: API_CONSTANTS.DEFAULT_TIMEOUT }
      ).toPromise();
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to refresh navigation: ${error.message}`);
      throw error;
    }
  }
}
