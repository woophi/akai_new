import { IsEnum, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { IsNotBlank } from 'nest-utils';
import { TrendingMediaType, TrendingPeriod } from 'src/contracts/movie-db';

export class ShowTimeDto {
  @IsString()
  @IsNotBlank()
  @Length(3, 512)
  searchQ: string;

  @IsNumber()
  @Max(1000)
  @Min(1)
  page: number = 1;
}

export class ShowTimeTrendingDto {
  @IsEnum(TrendingMediaType)
  mediaType: TrendingMediaType = TrendingMediaType.TV;
  @IsEnum(TrendingPeriod)
  period: TrendingPeriod = TrendingPeriod.Day;

  @IsNumber()
  @Max(1000)
  @Min(1)
  page: number = 1;
}
