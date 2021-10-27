import 'nest-utils';
import { LibInfo } from 'src/contracts/library';
import { MovieDBPersonInfo, MovieDBTVShow } from 'src/contracts/movie-db';
declare module 'nest-utils' {
  export const enum HashKey {
    UserLibrary = 'user_lib',
    TVShow = 'tv_show',
    TVPerson = 'tv_person',
  }
  export interface HashValue {
    [HashKey.UserLibrary]: LibInfo[];
    [HashKey.TVShow]: MovieDBTVShow;
    [HashKey.TVPerson]: MovieDBPersonInfo;
  }
}
