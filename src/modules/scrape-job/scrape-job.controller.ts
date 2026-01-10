import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ScrapeJobService } from './scrape-job.service';
import { ScrapeJob } from './scrape-job.schema';

@ApiTags('scrape-jobs')
@Controller('scrape-jobs')
export class ScrapeJobController {
  constructor(private readonly scrapeJobService: ScrapeJobService) {}

  @Get()
  @ApiOperation({ summary: 'Get recent scrape jobs' })
  @ApiResponse({ status: 200, description: 'Return recent scrape jobs', type: [ScrapeJob] })
  async findRecent(): Promise<ScrapeJob[]> {
    return this.scrapeJobService.findRecent();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get scrape job by ID' })
  @ApiResponse({ status: 200, description: 'Return scrape job', type: ScrapeJob })
  async findById(@Param('id') id: string): Promise<ScrapeJob> {
    return this.scrapeJobService.findById(id);
  }
}
