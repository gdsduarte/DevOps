-- Active: 1669938776289@@127.0.0.1@3306

CREATE DATABASE DevOps_Calendar;

USE DevOps_Calendar;

DROP TABLE IF EXISTS events, colors ;

CREATE TABLE colors (
    color_id INT NOT NULL,
    subject VARCHAR(50) NOT NULL,
    color VARCHAR(7) NOT NULL,
    PRIMARY KEY (color_id)
);

CREATE TABLE events (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(50) NOT NULL,
    subject VARCHAR(50),
    dateStart DATETIME NOT NULL,
    dateEnd DATETIME NOT NULL,
    description TEXT,
    color_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (color_id) REFERENCES colors(color_id)
);