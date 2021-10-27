import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { integrationConfig } from 'src/config/integration.config';
import { MoviDBSearchModel, MoviDBTrendingModel, MovieDBTVShow, MovieDBPersonInfo } from 'src/contracts/movie-db';
import { ConfigType } from '@nestjs/config';
import { ShowTimeDto, ShowTimeTrendingDto } from './dto/showTimeModel';

@Injectable()
export class ShowTimeService {
  private readonly logger = new Logger(ShowTimeService.name);
  constructor(
    private readonly httpService: HttpService,
    @Inject(integrationConfig.KEY)
    private readonly config: ConfigType<typeof integrationConfig>,
  ) {}

  async getTvShow(id: number) {
    try {
      const tvUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=${this.config.movieApiKey}&language=ru&append_to_response=credits`;

      const { data: tvData } = await firstValueFrom(this.httpService.get<MovieDBTVShow>(tvUrl));
      return tvData;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
  async searchTvShows(model: ShowTimeDto): Promise<MoviDBSearchModel> {
    const searchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${this.config.movieApiKey}&query=${encodeURI(
      model.searchQ,
    )}&language=ru&page=${model.page}&include_adult=false`;

    try {
      const { data } = await firstValueFrom(this.httpService.get<MoviDBSearchModel>(searchUrl));
      return data;
    } catch (error) {
      this.logger.error(error);
      return {
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
      };
    }
  }

  async getTrending(model: ShowTimeTrendingDto): Promise<MoviDBTrendingModel> {
    try {
      const url = `https://api.themoviedb.org/3/trending/${model.mediaType}/${model.period}?api_key=${this.config.movieApiKey}&language=ru&page=${model.page}&include_adult=false`;

      const { data } = await firstValueFrom(this.httpService.get<MoviDBTrendingModel>(url));
      return data;
    } catch (error) {
      this.logger.error(error);
      return { total_results: 0, total_pages: 0, results: [], page: 0 };
    }
  }
  async getPerson(id: number): Promise<MovieDBPersonInfo | null> {
    try {
      const url = `https://api.themoviedb.org/3/person/${id}?api_key=${this.config.movieApiKey}&language=ru&append_to_response=combined_credits`;

      const { data } = await firstValueFrom(this.httpService.get<MovieDBPersonInfo>(url));
      return data;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
