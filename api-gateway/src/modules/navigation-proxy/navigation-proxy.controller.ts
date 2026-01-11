import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NavigationProxyService, NavigationItem } from './navigation-proxy.service';
import { HistoryService } from '../history/history.service';

@ApiTags('navigation')
@Controller('api/navigation')
export class NavigationProxyController {
  constructor(
    private readonly navigationProxyService: NavigationProxyService,
    private readonly historyService: HistoryService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all navigation items' })
  @ApiResponse({ status: 200, description: 'Return all navigation items' })
  async findAll(): Promise<NavigationItem[]> {
    const navigation = await this.navigationProxyService.findAll();
    
    // Save to history if session_id is provided
    // In real app, this would come from session/cookie
    await this.historyService.create({
      session_id: 'default-session',
      path_json: navigation.map(item => ({ navigation: item.slug }) as any)
    });
    
    return navigation;
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get navigation item by slug' })
  @ApiResponse({ status: 200, description: 'Return navigation item', type: NavigationItem })
  async findBySlug(@Param('slug') slug: string): Promise<NavigationItem> {
    const navigation = await this.navigationProxyService.findBySlug(slug);
    
    // Save to history
    await this.historyService.create({
      session_id: 'default-session',
      path_json: [{ navigation: slug }]
    });
    
    return navigation;
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh navigation data' })
  @ApiResponse({ status: 200, description: 'Navigation refresh triggered' })
  async refreshNavigation(): Promise<{ message: string }> {
    const result = await this.navigationProxyService.refreshNavigation();
    
    // Save to history
    await this.historyService.create({
      session_id: 'default-session',
      path_json: [{ action: 'refresh_navigation' }]
    });
    
    return result;
  }
}
