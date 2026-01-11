import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryProxyService, CategoryItem } from './category-proxy.service';
import { HistoryService } from '../history/history.service';

@ApiTags('categories')
@Controller('api/categories')
export class CategoryProxyController {
  constructor(
    private readonly categoryProxyService: CategoryProxyService,
    private readonly historyService: HistoryService,
  ) {}

  @Get('navigation/:navigationSlug')
  @ApiOperation({ summary: 'Get categories by navigation slug' })
  @ApiResponse({ status: 200, description: 'Return categories for navigation', type: [CategoryItem] })
  async findByNavigationSlug(@Param('navigationSlug') navigationSlug: string): Promise<CategoryItem[]> {
    const categories = await this.categoryProxyService.findByNavigationSlug(navigationSlug);
    
    // Save to history
    await this.historyService.create({
      session_id: 'default-session',
      path_json: categories.map(item => ({ navigation: navigationSlug, category: item.slug }) as any)
    });
    
    return categories;
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get category by slug' })
  @ApiResponse({ status: 200, description: 'Return category', type: CategoryItem })
  async findBySlug(@Param('slug') slug: string): Promise<CategoryItem> {
    const category = await this.categoryProxyService.findBySlug(slug);
    
    // Save to history
    await this.historyService.create({
      session_id: 'default-session',
      path_json: [{ category: slug }] as any
    });
    
    return category;
  }
}
