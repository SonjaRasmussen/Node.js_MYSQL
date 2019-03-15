# Node.js_MYSQL


## Week #12 Assignment
This week we created an Amazon-like store with MySQL. 
##### The app will;
 * take in orders from customers 
 * add and deplete stock from the store's inventory 
 * add new inventory  
 * track department sales 
 * Add new departments 


 [See full Demo here](https://drive.google.com/file/d/1LB_mlGXxXV86LZG80yHwXNqWQMYbbYib/view)
 

## Getting Started
* Clone repo
* npm install
* Run command in Terminal 



## Customer
Run command $ node index.js

##### What This Does
* displays the table of products
* prompts customer which product they would like to purchase by ID number
* asks for the quantity
* if there is a enough of the product in stock, it will return the total for that purchase.
* however, if there is not enough of the product in stock, it will tell the user that there isn't enough of the product.
* when the purchase goes through, it updates the stock quantity to reflect the purchase.



## Manager
Run command $ node index-2.js


##### What This Does
Provides a menu of options and actions;
1. View Products
2. View Low Inventory 
3. Add to Inventory
4. Add New Products

## Supervisor
Run command $ node index-3.js

##### What This Does
* view sales by department
* add new departments
* returns an error for departments that have already been added
