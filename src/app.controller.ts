import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Get API info' })
  getApiInfo() {
    return {
      message: 'World of Books Scraper API',
      version: '1.0.0',
      endpoints: {
        navigation: '/navigation',
        categories: '/categories',
        products: '/products',
        'product-details': '/product-details',
        reviews: '/reviews',
        'scrape-jobs': '/scrape-jobs',
        swagger: '/api',
      },
      status: 'running',
    };
  }
}
