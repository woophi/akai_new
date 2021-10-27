import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'show_time_library',
})
export class ShowTimeLibrary {
  @PrimaryGeneratedColumn('increment', { type: 'int8', name: 'show_time_library_id' })
  id: string;

  @Column({
    type: 'int4',
    name: 'vk_user_id',
  })
  vkUserId: number;
  @Column({
    type: 'int4',
    name: 'movie_db_id',
  })
  movieDBId: number;

  @Column({ type: 'boolean' })
  watched: boolean;
}
