drop table show_time;

create table show_time_library (
  show_time_library_id bigserial,
  vk_user_id int4 not null,
  movie_db_id int4 not null,
  watched boolean not null,
  primary key (show_time_library_id)
);

create unique index uniq_vk_user_movie_item_idx on show_time_library (vk_user_id, movie_db_id);
create index lib_vk_user_idx on show_time_library (vk_user_id);