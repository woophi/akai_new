create unique index uniq_vk_user_movie_item_idx on show_time_library (vk_user_id, movie_db_id);
create index lib_vk_user_idx on show_time_library (vk_user_id);