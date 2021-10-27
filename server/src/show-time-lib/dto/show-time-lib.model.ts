import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { IsNotBlank } from 'nest-utils';

export class ShowTimeLibWatchedDTO {
  @IsString()
  @IsNotBlank()
  id: string;

  @IsBoolean()
  watched: boolean;
}
export class ShowTimeLibSaveDTO {
  @IsNumber()
  movieDBId: number;
}
export class ShowTimeLibDeleteDTO {
  @IsString()
  @IsNotBlank()
  id: string;
}
