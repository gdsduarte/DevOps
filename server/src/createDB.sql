-- Active: 1669938776289@@127.0.0.1@3306

CREATE DATABASE scheduler_events;

USE scheduler_events;

DROP TABLE IF EXISTS events;

CREATE TABLE events (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    subject VARCHAR(20),
    dateStart DATETIME NOT NULL,
    dateEnd DATETIME NOT NULL,
    description TEXT,
    backgroundColor VARCHAR(7)
);