-- Active: 1669938776289@@127.0.0.1@3306

CREATE DATABASE DevOps_Calendar;

USE DevOps_Calendar;

DROP TABLE IF EXISTS events;

CREATE TABLE events (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(50) NOT NULL,
    subject VARCHAR(50) NOT NULL,
    start DATETIME NOT NULL,
    end DATETIME NOT NULL,
    description TEXT,
    backgroundColor VARCHAR(15),
    createdAt DATETIME,
    updatedAt DATETIME,
    PRIMARY KEY (id)
);