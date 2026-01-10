import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from './product.schema';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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
  ): Promise<{ products: Product[], total: number }> {
    return this.productService.findProducts(
      categorySlug,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20
    );
  }

  @Get(':sourceId')
  @ApiOperation({ summary: 'Get product by source ID' })
  @ApiResponse({ status: 200, description: 'Return product', type: Product })
  async findBySourceId(@Param('sourceId') sourceId: string): Promise<Product> {
    return this.productService.findBySourceId(sourceId);
  }
}
