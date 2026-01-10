import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductDetailService } from './product-detail.service';
import { ProductDetail } from './product-detail.schema';

@ApiTags('product-details')
@Controller('product-details')
export class ProductDetailController {
  constructor(private readonly productDetailService: ProductDetailService) {}

  @Get(':sourceId')
  @ApiOperation({ summary: 'Get product detail by source ID' })
  @ApiResponse({ status: 200, description: 'Return product detail', type: ProductDetail })
  async findBySourceId(@Param('sourceId') sourceId: string): Promise<ProductDetail> {
    return this.productDetailService.findBySourceId(sourceId);
  }
}
