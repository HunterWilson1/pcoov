
CREATE DATABASE IF NOT EXISTS pcoov;


USE pcoov;



CREATE TABLE IF NOT EXISTS balsamics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tags JSON NOT NULL,
    image VARCHAR(255) NOT NULL,
    pairings JSON NOT NULL
);


CREATE TABLE IF NOT EXISTS olive_oils (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tags JSON NOT NULL,
    image VARCHAR(255) NOT NULL,
    pairings JSON
);
