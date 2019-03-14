var inquirer = require('inquirer');
var mysql = require("mysql");
var Table = require("cli-table");
var util = require('util');



var connection = mysql.createConnection({
    host:"localhost",
    port: "3306",
    user: "root",
    password: "A2bruti07",
    database: "bamazonDB"

});

connection.connect(function(err){
    if(err)throw err;
   
    supervisorView();
});

function supervisorView(){
    inquirer.prompt({
        name: 'action',
        type: 'rawlist',
        message: "What would you like to do ?",
        choices: [
            '1. View Sales By Department', 
            '2. Create New Department'
        ]
    }).then(function(answer){
        console.log("You chose: " + util.inspect(answer));
        switch (answer.action){  
        case "1. View Sales By Department":
        viewSales();
        break;    
        
       case "Create new department":
        createNewDepartment();
        break;    
        
        case "Exit":
        exit();
       break;
    
        }
    }); 
};
     

function viewSales(){

    var table = new Table({
        head: ["department_id", "department_name", "overhead_cost", "department sales", "total_profit" ]
    });

    var tableArr = [];
    var query = "SELECT d.department_id, d.department_name, overhead_cost, SUM(product_sales) AS dept_sales, (SUM(product_sales) - overhead_Cost) AS total_profit FROM bamazonDB.departments d JOIN bamazonDB.products p ON d.department_name = p.department_name GROUP BY d.department_id, d.department_name, overhead_cost";
        
        
        connection.query(query, function(err, rows) {
        for(i=0; i < rows.length; i++){
            tableArr.push([rows[i].department_id,  rows[i].department_name, '$'+rows[i].overhead_cost.toFixed(2), '$'+rows[i].dept_sales.toFixed(2), '$'+rows[i].total_profit.toFixed(2)]);
        }
        for(i=0; i < rows.length; i++){
            table.push(tableArr[i]);
        }
        console.log(table.toString());
        supervisorView();
          });
        }
   
    
function createNewDepartment(){
    inquirer.prompt([
        {
        name: "department_name",
        type: " input",
        message: " What is the new department name? "
    },
    {   name : "overhead_cost",
        type: "input",
        message: "What is the overhead_cost of this department? "

    }]).then(function(answer){

        connection.query("INSERT INTO departments SET ?", 
        {
            department_name: answer.department_name,
            overhead_cost: answer.overhead_cost
        }, 
        
        function (err, res){
            if (err){
                throw err;
            } else {
                console.log("The department was added successfully!");
                supervisorView();
            }
        
        });
    });
};