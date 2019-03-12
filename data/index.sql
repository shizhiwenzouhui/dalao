SET NAMES UTF8;
DROP DATABASE IF EXISTS JD;
CREATE DATABASE JD CHARSET=UTF8;
USE JD;
CREATE TABLE jd_indexBanner(
  lid TINYINT PRIMARY KEY AUTO_INCREMENT,
  imgs VARCHAR(128) NOT NULL
);
INSERT INTO jd_indexBanner VALUES(1,'images/banner1.png');
INSERT INTO jd_indexBanner VALUES(2,'images/banner2.png');
INSERT INTO jd_indexBanner VALUES(3,'images/banner3.png');
INSERT INTO jd_indexBanner VALUES(4,'images/banner4.png');
INSERT INTO jd_indexBanner VALUES(5,'images/banner5.png');
INSERT INTO jd_indexBanner VALUES(6,'images/banner6.png');
