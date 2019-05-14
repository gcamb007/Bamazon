DROP DATABASE IF EXISTS bamazomDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
    item_id VARCHAR(100) NULL,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price INTEGER(10),
    stock_quantity INTEGER(10),
	PRIMARY KEY (id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ('TNF0001', 'The North Face Unisex Borealis','Outdoor Backpacks', 108.65, 28);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ('TNF0002', 'The North Face Vault Backpack','Outdoor Backpacks', 71.10, 16);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ('HS0001', 'High Sierra Jarvis Laptop Backpack','Outdoor Backpacks', 53.99, 19);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ('OV0001', 'Outdoor Vitals Summit Sleeping Bag','Sleeping Bags', 239.97, 9);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ('H&B0001', 'Hyke & Byke Snowmass Fill Power Hydrophobic','Sleeping Bags', 159.97, 32);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ('MH0001', 'Mountain Hardwear Bozeman Torch','Sleeping Bags', 97.26, 13);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ('CS0001', 'Columbia Sportswear 4 Person Dome Tent','Camping Tents', 80.00, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ('CS0002', 'Columbia Sportswear Fall River 6 Person Instant Dome Tent','Camping Tents', 180.00, 16);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ('COL0001', 'Coleman Portable Camping Quad Chair with 4-Can Cooler','Camping Chairs', 31.19, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ('KEL0001', 'Kelty Deluxe Reclining Lounge Chair','Camping Chairs', 79.95, 9);

