import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'nest-utils';
import { TrendingMediaType, TrendingPeriod } from 'src/contracts/movie-db';
import { SignGuard } from 'src/guards/sign.guard';
import { ShowTimeDto, ShowTimeTrendingDto } from './dto/showTimeModel';
import { ShowTimeHashService } from './show-time-hash.service';
import { ShowTimeService } from './show-time.service';

@ApiTags('TV show info')
@ApiResponse({ status: 403, description: 'Failed to check vk sign' })
@Controller('api/show-time')
@UseInterceptors(TransformInterceptor)
@UseGuards(SignGuard)
export class ShowTimeController {
  constructor(private readonly sh: ShowTimeHashService, private readonly ss: ShowTimeService) {}

  @ApiOperation({ summary: 'Returns most relevant tv shows' })
  @ApiResponse({ schema: { example: { data: 'MoviDBSearchModel' } }, status: 200 })
  @ApiResponse({ description: 'if query is blank or not valid', status: 400 })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        searchQ: { type: 'string', maxLength: 512, minLength: 3 },
        page: { type: 'number', maximum: 1000, minimum: 1, default: 1 },
      },
    },
  })
  @Post('/search')
  @HttpCode(HttpStatus.OK)
  getSearch(@Body() model: ShowTimeDto) {
    return this.ss.searchTvShows(model);
  }

  @ApiOperation({ summary: 'Returns trending data' })
  @ApiResponse({ schema: { example: { data: 'MoviDBTrendingModel' } }, status: 200 })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        mediaType: { type: 'enum', enum: [TrendingMediaType], default: TrendingMediaType.TV },
        period: { type: 'enum', enum: [TrendingPeriod], default: TrendingPeriod.Day },
        page: { type: 'number', maximum: 1000, minimum: 1, default: 1 },
      },
    },
  })
  @Post('/trending')
  @HttpCode(HttpStatus.OK)
  getRecentSearch(@Body() model: ShowTimeTrendingDto) {
    return this.ss.getTrending(model);
  }

  @ApiOperation({ summary: 'Get show info by id' })
  @ApiResponse({ schema: { example: { data: 'MovieDBTVShow' } }, status: 200 })
  @ApiResponse({ description: 'if param id is not valid', status: 400 })
  @ApiParam({ name: 'id', type: 'number', required: true })
  @Get('/info/:id')
  @HttpCode(HttpStatus.OK)
  getInfo(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })) id: number) {
    return this.sh.getTvShow(id);
  }

  @ApiOperation({ summary: 'Returns person info' })
  @ApiResponse({ schema: { example: { data: 'MovieDBPersonInfo' } }, status: 200 })
  @ApiParam({ name: 'id', type: 'number', required: true })
  @Get('/person/:id')
  @HttpCode(HttpStatus.OK)
  getPerson(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })) personId: number) {
    return this.sh.getPerson(personId);
  }
}
