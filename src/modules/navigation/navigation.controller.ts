import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NavigationService } from './navigation.service';
import { Navigation } from './navigation.schema';

@ApiTags('navigation')
@Controller('navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all navigation items' })
  @ApiResponse({ status: 200, description: 'Return all navigation items', type: [Navigation] })
  async findAll(): Promise<Navigation[]> {
    return this.navigationService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get navigation item by slug' })
  @ApiResponse({ status: 200, description: 'Return navigation item', type: Navigation })
  async findBySlug(@Param('slug') slug: string): Promise<Navigation> {
    return this.navigationService.findBySlug(slug);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh navigation data' })
  @ApiResponse({ status: 200, description: 'Navigation refresh queued' })
  async refreshNavigation(): Promise<{ message: string }> {
    return { message: 'Navigation refresh queued' };
  }
}
