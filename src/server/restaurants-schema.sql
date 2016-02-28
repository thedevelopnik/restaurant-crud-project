\connect gTables

drop table if exists reviews;
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

create table reviews
  (id serial primary key,
    res_id integer references restaurants(id),
    rev_name varchar(30),
    rev_date varchar(255),
    rating integer,
    review varchar(1000));
