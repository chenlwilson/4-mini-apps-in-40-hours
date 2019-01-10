/*CREATE DATABASE checkout*/

USE checkout;

CREATE TABLE purchase (
  ID integer NOT NULL AUTO_INCREMENT,
  username text NOT NULL,
  email text NOT NULL,
  pw text NOT NULL,
  address1 text,
  address2 text,
  city text,
  state text,
  shipzip integer,
  phone integer,
  cc integer,
  exp integer,
  cvv integer,
  billzip integer,
  PRIMARY KEY (ID)
)

/* mysql -u root < schema.sql */