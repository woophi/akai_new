import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'nest-utils';
import { SignGuard } from 'src/guards/sign.guard';
import { ShowTimeLibDeleteDTO, ShowTimeLibSaveDTO, ShowTimeLibWatchedDTO } from './dto/show-time-lib.model';
import { ShowTimeLibService } from './show-time-lib.service';

@ApiTags('TV show user library')
@ApiResponse({ status: 403, description: 'Failed to check vk sign' })
@Controller('api/show-time/lib')
@UseInterceptors(TransformInterceptor)
@UseGuards(SignGuard)
export class ShowTimeLibController {
  constructor(private readonly ss: ShowTimeLibService) {}

  @ApiOperation({ summary: 'Get user library info' })
  @ApiResponse({ schema: { example: { data: 'LibInfo[]' } }, status: 200 })
  @ApiQuery({ name: 'vkUserId', type: 'number', required: true })
  @Get()
  @HttpCode(HttpStatus.OK)
  getInfo(@Query('vkUserId', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })) vkUserId: number) {
    return this.ss.getUserLib(vkUserId);
  }

  @ApiOperation({ summary: 'Save new item to library' })
  @ApiResponse({ status: 201, description: 'created' })
  @ApiResponse({ status: 409, description: 'Already created' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        movieDBId: { type: 'number' },
      },
    },
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async saveNewItem(
    @Body() model: ShowTimeLibSaveDTO,
    @Query('vkUserId', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })) vkUserId: number,
  ) {
    await this.ss.saveNewItem(vkUserId, model.movieDBId);
  }

  @ApiOperation({ summary: 'Toggle item watched' })
  @ApiResponse({ status: 204, description: 'updated' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        watched: { type: 'boolean' },
      },
    },
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('/watched')
  async toggleItemWatched(
    @Body() model: ShowTimeLibWatchedDTO,
    @Query('vkUserId', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })) vkUserId: number,
  ) {
    await this.ss.toggleItemWatched(model.id, vkUserId, model.watched);
  }

  @ApiOperation({ summary: 'Delete item from library' })
  @ApiResponse({ status: 204, description: 'deleted' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    },
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  async deleteItem(
    @Body() model: ShowTimeLibDeleteDTO,
    @Query('vkUserId', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })) vkUserId: number,
  ) {
    await this.ss.deleteItem(model.id, vkUserId);
  }
}
