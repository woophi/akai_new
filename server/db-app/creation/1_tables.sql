create table show_time_library (
  show_time_library_id bigserial,
  vk_user_id int4 not null,
  movie_db_id int4 not null,
  watched boolean not null,
  primary key (show_time_library_id)
);
