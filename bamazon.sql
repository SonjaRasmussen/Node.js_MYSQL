DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(

item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50)NULL,
department_name VARCHAR(50)NULL,
price INT NULL,
stock_quantity INT DEFAULT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES 
(1, "tooth paste", "beauty", 3.00, 50),(2, "Shampoo" , "beauty", 12.00, 50), 
(3, "conditioner", "beauty", 14.00, 45),(4, "hairspray" , "beauty", 19.00, 30), 
(5, "milk", "grocery", 3.00, 20),(6, "eggs" , "grocery", 5.00, 90), 
(7, "cheese", "grocery", 6.00, 60),(8, "white socks" , "clothing", 12.00, 50), 
(9, "black socks", "clothing", 12.00, 50),(10, "white t-shirt" , "clothing", 35.00, 100)
;





