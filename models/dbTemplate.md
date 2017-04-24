create user '4irad'@'localhost' identified by '1234';

create database 4irad;

create table users(
    id integer key not null auto_increment,
    username varchar(64) not null,
    password varchar(256) not null
);

create table highscore(
    id integer key not null auto_increment,
    name varchar(64) not null,
    score integer not null,
    userid integer not null
);
