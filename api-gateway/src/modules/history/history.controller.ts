import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { HistoryService, CreateHistoryDto } from './history.service';
import { ViewHistory } from './history.schema';

@ApiTags('history')
@Controller('api/history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  @ApiOperation({ summary: 'Save view history' })
  @ApiBody({ type: 'CreateHistoryDto' })
  @ApiResponse({ status: 201, description: 'History saved successfully' })
  async create(@Body() createHistoryDto: any): Promise<ViewHistory> {
    return this.historyService.create(createHistoryDto);
  }

  @Get('session/:sessionId')
  @ApiOperation({ summary: 'Get history by session ID' })
  @ApiResponse({ status: 200, description: 'Return history for session', type: [ViewHistory] })
  async findBySessionId(@Param('sessionId') sessionId: string): Promise<ViewHistory[]> {
    return this.historyService.findBySessionId(sessionId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get history by user ID' })
  @ApiResponse({ status: 200, description: 'Return history for user', type: [ViewHistory] })
  async findByUserId(@Param('userId') userId: string): Promise<ViewHistory[]> {
    return this.historyService.findByUserId(userId);
  }
}
