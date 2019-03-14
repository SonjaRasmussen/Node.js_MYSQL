var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "A2bruti07",
    database: "bamazonDB"
});

connection.connect(function(err){
    if(err) throw err;
    runSearch();
});

function runSearch(){
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",

        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "Exit"
        ]
    })

    .then(function(answer){
        switch(answer.action){
            case "View Products for Sale":
            viewProducts();
            break;

            case "View Low Inventory":
            viewLow();
            break;

            case "Add to Inventory":
            addInventory();
            break;

            case "Add New Product":
            addNew();
            break;

            case "Exit":
            exit();
            break;
        }
    });
};

function viewProducts(){
    var table = new Table({
        head:['item ID', 'Product Name', 'Price', 'Stock Quantity']
    });

var tableArr = [];
var query = "SELECT * FROM products";
connection.query(query, function(err, rows){
    
    for( i = 0; i < rows.length; i++){
        tableArr.push([rows[i].item_id, rows[i].product_name, rows[i].price, rows[i].stock_quantity]);
    }

    for (i = 0; i < rows.length; i++){
        table.push(tableArr[i]);
    }
    console.log(table.toString());
    runSearch();
   })

}

function viewLow(){
    var table = new Table({
        head: ["Item ID", "Product Name", "Price", "Stock Quantity"]
    });

    var tableArr = [];
  var query = "SELECT * FROM products ORDER BY stock_quantity ASC";
  connection.query(query, function(err, rows) {
    for (i = 0; i < rows.length; i++) {
      tableArr.push([rows[i].item_id, rows[i].product_name, rows[i].price, rows[i].stock_quantity]);
        }

        for (i= 0; i < rows.length; i++) {
            if (rows[i].stock_quantity < 50) {
              table.push(tableArr[i]);
            } 
          }
          console.log(table.toString());
          runSearch();
    })
}

function addInventory(){
    var table = new Table ({
        head: ["Item ID", "Product Name", "Price", "Quantity"]
    });

    var tableArr = [];
    var query = "SELECT * FROM products";
    connection.query(query, function(err, rows){
        for (i=0; i < rows.length; i++){
            tableArr.push([rows[i].item_id, rows[i].product_name, rows[i].price, rows[i].stock_quantity]);
        }

        for (i=0; i < rows.length; i++){
            tableArr.push(tableArr[i]);
        }

        console.log(table.toString());
        inquirer.prompt([
            {
                name: "id",
                message: "What is the ID of the product you would like to add to?"
            },
            {
                name: "quantity",
                message: "How many units of this product would you like to add?"
            },
            
        ]).then(function(answers){

            findQuantity(answers.id, answers.quantity);
            });
        });
    }

    function findQuantity(id, quantity){

        var query = "SELECT * FROM products";
        connection.query(query, function(err, rows){
            var idNum = parseFloat(id) - 1;
            stock = rows[idNum].stock_quantity;
            updatedQuantity = stock + parseFloat(quantity);
            addQuantity(id);
        });
    }

    function addQuantity(id){
        var query = "UPDATE products SET? WHERE?";
        connection.query(query, [{stock_quantity: updatedQuantity}, {item_id: id}], function(err, res){
            console.log("Added to the current stock successfully!");
            runSearch();
        });
    }

    function addNew(){
        inquirer.prompt([
            {
                name: "product",
                message: "What is the name of the product you want to add?"
            },
            {
                name: "department",
                message: "What department does this product live in?"
            },
            {
                name: "price",
                message: "How much does this product cost?"
            },
            {
                name: "quantity",
                message: "How many units would you like to add?"
            }
        ]).then(function(answers){

            var query = connection.query("INSERT INTO products SET?",
            
            {
                product_name: answers.product,
                department_name: answers.department,
                price: answers.quantity,
                stock_quantity: answers.quantity
            },

            function(err, res){
                console.log("Added product successfully!");
                runSearch();
            });
            
        });
    };

    function exit(){
        connection.end();
    }