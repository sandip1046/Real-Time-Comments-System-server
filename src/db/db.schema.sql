-- here all the query is present which i used to create the table and insert the data in the table

create database detrator;

use detrator;

CREATE TABLE IF NOT EXISTS user (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(255) NOT NULL,
)

CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  comment TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- in both the table data is inserted using the query while sending request to the server from the client side

-- the data is fetched using the query and displayed in the client side
