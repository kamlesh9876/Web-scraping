import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { Review } from './review.schema';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('product/:productSourceId')
  @ApiOperation({ summary: 'Get reviews by product source ID' })
  @ApiResponse({ status: 200, description: 'Return reviews for product', type: [Review] })
  async findByProductSourceId(@Param('productSourceId') productSourceId: string): Promise<Review[]> {
    return this.reviewService.findByProductSourceId(productSourceId);
  }

  @Get(':sourceId')
  @ApiOperation({ summary: 'Get review by source ID' })
  @ApiResponse({ status: 200, description: 'Return review', type: Review })
  async findBySourceId(@Param('sourceId') sourceId: string): Promise<Review> {
    return this.reviewService.findBySourceId(sourceId);
  }
}
