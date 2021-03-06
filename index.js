var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "A2bruti07",
    database: "bamazonDB"
});

connection.connect(function(err){
    if(err) throw err;
   
    showStore();
});


let stock = 0;
let product_sales = 0;
let updateQuantity = 0;


 function showStore(){
     var table = new Table({
         head: ["Item ID", "Product Name", "Price"]
    });

       
         for(i=0; i< rows.length; i++){
             tableArr.push([rows[i].item_id, rows[i].product_name, rows[i].price]);
        }

     for (i=0; i< rows.length;i++){
         table.push(tableArr[i]);
     }
     console.log(table.toString());

     runSearch();

     })

};

function runSearch(){
    inquirer.prompt([

    {
        name: "id",
        message: " What is the product that you would like to buy?"
    },
    {
        name: "quantity",
        message: "How many units of this product would you like to buy?"
    }    
    ]).then(function(answers){
       checkProduct(answers.id, answers.quantity);
    });
}

function checkProduct(id, quantity) {
    console.log("Checking availability...");
  
    var query = "SELECT stock_quantity, price, product_sales FROM products WHERE ?";
  
    connection.query(query, {item_id: id}, function(err,res){
       
  
        stock = res[0].stock_quantity;
        product_sales = res[0].product_sales;
  
        if(res[0].stock_quantity >= quantity) {
          console.log("We have availability! Purchasing now!");
          buyProduct(id, quantity, quantity * res[0].price);
        } else {
          console.log("Insufficient quantity!");
          showStore();
        };
    });
  }; 
  

 function buyProduct(id, quantity, purchase_price){
     updatedQuantity = stock - quantity;
     product_sales = product_sales + purchase_price;

     var query = "UPDATE products SET ? WHERE ?";

     connection.query(query, [{stock_quantity: updatedQuantity, product_sales: product_sales},{item_id: id}], function(err, res){
        console.log("Purcahse is successful!");
        showPrice(id,quantity);
        }   

    );
 } 

 function showPrice(id, quantity){
     var query = "SELECT price FROM products WHERE?";

     connection.query(query,{item_id: id}, function(err, res){
        if (err) throw err;
         console.log("Your total purcahse is " + (res[0].price * quantity));
         connection.end();
     });
 };

