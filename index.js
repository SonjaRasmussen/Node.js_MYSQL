var mysql = require("mysql");
var inquirer = require("inquirer");
//var table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "A2bruti07",
    database: "bamazonDB"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("this works");
});

