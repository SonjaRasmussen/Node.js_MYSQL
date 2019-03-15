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
            { name: '1. View Sales By Department', value: 'view sales' },
            { name: '2. Create New Department', value: 'add new' },
            { name: '3. Exit', value: 'exit' }
        ]
    }).then(function(answer){
        switch (answer.action){  
        case "view sales":
        viewSales();
        break;    
        
       case "add new":
        createNewDepartment();
        break;    
        
        case "exit":
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
    var query = "SELECT d.department_id, d.department_name, overhead_cost, IFNULL(SUM(product_sales),0) AS dept_sales, (IFNULL(SUM(product_sales),0) - overhead_Cost) AS total_profit FROM bamazonDB.departments d LEFT JOIN bamazonDB.products p ON d.department_name = p.department_name GROUP BY d.department_id, d.department_name, overhead_cost";
        
        
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
        type: "input",
        message: "What is the new department name?"
    },
    {   name : "overhead_cost",
        type: "input",
        message: "What is the overhead_cost of this department?"
    }

]).then(function(answer){

        var query = connection.query("INSERT INTO departments SET ?", 
        {
            department_name: answer.department_name,
            overhead_cost: answer.overhead_cost
        }, 
        
        function (err, res){
            if (err){
                console.log("This department can't be added: " + err);
                supervisorView();
            } else {
                console.log("The department was added successfully!");
                supervisorView();
            }
        
        });
    });
};

function exit() {
    connection.end();
}
