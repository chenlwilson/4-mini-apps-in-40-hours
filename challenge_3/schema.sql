/*CREATE DATABASE checkout*/

USE checkout;

CREATE TABLE purchase (
  ID integer NOT NULL AUTO_INCREMENT,
  step text NOT NULL,
  username text NOT NULL,
  email text NOT NULL,
  pw text NOT NULL,
  address1 text,
  address2 text,
  city text,
  state text,
  shipzip text,
  phone text,
  cc text,
  exp text,
  cvv text,
  billzip text,
  PRIMARY KEY (ID)
)

/* mysql -u root < schema.sql */