DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(

item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100)NULL,
department_name VARCHAR(100)NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT NULL,
product_sales DECIMAL (10,2) NOT NULL DEFAULT 0,
PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES 
(1, "tooth paste", "beauty", 3.00, 50, 0),(2, "Shampoo" , "beauty", 12.00, 50,0), 
(3, "conditioner", "beauty", 14.00, 45, 0),(4, "hairspray" , "beauty", 19.00, 30,0), 
(5, "milk", "grocery", 3.00, 20, 0),(6, "eggs" , "grocery", 5.00, 90, 0), 
(7, "cheese", "grocery", 6.00, 60, 0),(8, "white socks" , "clothing", 12.00, 50, 0), 
(9, "black socks", "clothing", 12.00, 50, 0),(10, "white t-shirt" , "clothing", 35.00, 100, 0)
;

CREATE	TABLE departments(
department_id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(100) NULL,
overhead_cost DECIMAL(10,2)NOT NULL DEFAULT 500,
PRIMARY KEY(department_id)
);

INSERT INTO departments(department_id, department_name, overhead_cost)
VALUES
(1, "beauty", 1000),
(2, "grocery", 2000),
(3, "clothing", 3000);





