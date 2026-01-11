import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Category } from './category.schema';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('navigation/:navigationSlug')
  @ApiOperation({ summary: 'Get categories by navigation slug' })
  @ApiResponse({ status: 200, description: 'Return categories for navigation', type: [Category] })
  async findByNavigationSlug(@Param('navigationSlug') navigationSlug: string): Promise<Category[]> {
    return this.categoryService.findByNavigationSlug(navigationSlug);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get category by slug' })
  @ApiResponse({ status: 200, description: 'Return category', type: Category })
  async findBySlug(@Param('slug') slug: string): Promise<Category> {
    return this.categoryService.findBySlug(slug);
  }

  @Post('navigation/:navigationSlug/refresh')
  @ApiOperation({ summary: 'Refresh categories for navigation' })
  @ApiResponse({ status: 200, description: 'Categories refresh queued' })
  async refreshCategories(@Param('navigationSlug') navigationSlug: string): Promise<{ message: string }> {
    return { message: 'Categories refresh queued' };
  }
}
