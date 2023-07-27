create table if not exists book (
    id bigserial not null,
    author varchar(255),
    name varchar(255),
    pic_byte bytea,
    price varchar(255),
    primary key (id)
);

create table if not exists users (
    id bigserial not null,
    date_of_created timestamp(6),
    email varchar(255),
    name varchar(255),
    password varchar(1000),
    role varchar(255),
    primary key (id)
);
