import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ProductProxyService, ProductItem, ProductsResponse } from './product-proxy.service';
import { HistoryService } from '../history/history.service';

@ApiTags('products')
@Controller('api/products')
export class ProductProxyController {
  constructor(
    private readonly productProxyService: ProductProxyService,
    private readonly historyService: HistoryService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get products with optional filtering' })
  @ApiQuery({ name: 'categorySlug', required: false, description: 'Filter by category slug' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page', type: Number })
  @ApiResponse({ status: 200, description: 'Return products with pagination' })
  async findProducts(
    @Query('categorySlug') categorySlug?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<ProductsResponse> {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 20;
    
    const result = await this.productProxyService.findProducts(categorySlug, pageNum, limitNum);
    
    // Save to history
    await this.historyService.create({
      session_id: 'default-session',
      path_json: result.products.map(item => ({ 
        navigation: item.navigation_slug,
        category: item.category_slug,
        product: item.source_id 
      }) as any)
    });
    
    return result;
  }

  @Get(':sourceId')
  @ApiOperation({ summary: 'Get product by source ID' })
  @ApiResponse({ status: 200, description: 'Return product', type: ProductItem })
  async findBySourceId(@Param('sourceId') sourceId: string): Promise<ProductItem> {
    const product = await this.productProxyService.findBySourceId(sourceId);
    
    // Save to history
    await this.historyService.create({
      session_id: 'default-session',
      path_json: [{ product: sourceId }] as any
    });
    
    return product;
  }
}
