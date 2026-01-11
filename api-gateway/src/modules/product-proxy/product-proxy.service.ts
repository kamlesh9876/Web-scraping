import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { API_CONSTANTS } from '../../common/constants';

export interface ProductItem {
  source_id: string;
  title: string;
  price: number;
  currency: string;
  image_url: string;
  source_url: string;
  category_slug: string;
  navigation_slug: string;
  last_scraped_at?: string;
}

export interface ProductsResponse {
  products: ProductItem[];
  total: number;
}

@Injectable()
export class ProductProxyService {
  private readonly logger = new Logger(ProductProxyService.name);

  constructor(private readonly httpService: HttpService) {}

  async findProducts(categorySlug?: string, page = 1, limit = 20): Promise<ProductsResponse> {
    try {
      const params = new URLSearchParams({
        ...(categorySlug && { categorySlug }),
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await this.httpService.get(
        `${API_CONSTANTS.SCRAPER_SERVICE_BASE_URL}/products?${params}`,
        { timeout: API_CONSTANTS.DEFAULT_TIMEOUT }
      ).toPromise();
      return response.data as ProductsResponse;
    } catch (error) {
      this.logger.error(`Failed to fetch products: ${error.message}`);
      throw error;
    }
  }

  async findBySourceId(sourceId: string): Promise<ProductItem> {
    try {
      const response = await this.httpService.get(
        `${API_CONSTANTS.SCRAPER_SERVICE_BASE_URL}/products/${sourceId}`,
        { timeout: API_CONSTANTS.DEFAULT_TIMEOUT }
      ).toPromise();
      return response.data as ProductItem;
    } catch (error) {
      this.logger.error(`Failed to fetch product ${sourceId}: ${error.message}`);
      throw error;
    }
  }
}
