create function schema_create_fk_constraint(table_name text, column_name text, foreign_table_name text, foreign_column_name text) returns void as $$
  declare sql_text text;
  begin sql_text := format ('alter table %s add constraint fk_%s_%s foreign key (%s) references %s(%s)',
                            table_name, table_name, column_name, column_name, foreign_table_name, foreign_column_name); execute sql_text;
  end
$$ language plpgsql;
