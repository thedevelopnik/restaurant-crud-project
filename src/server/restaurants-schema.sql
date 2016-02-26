\connect gTables

drop table if exists restaurants;
create table restaurants
  (id serial primary key,
    name varchar(40),
    cuisine varchar(255),
    city varchar(255),
    state varchar(3),
    rating integer,
    image varchar(255),
    descrip varchar(1000));
