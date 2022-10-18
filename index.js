const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTbl = require("console.table");

// THIS PART HELPS US TO CONNECT OUR LOCAL HOST
const connection = mysql.createConnection({
  host: "localhost",
  port: 3301,
  user: "root",
  password: "password",
  database: "employees_db",
});

connection.connect((err) => {
  if (err == true) {
    throw err;
  }
});

function choices() {
  inquirer
    .prompt({
      name: "greeting",
      type: "list",
      message: "Welcome to archive ! What is the next move?",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "Add an employee",
        "Add a department",
        "Add a role",
        "Update employee role",
        "Delete an employee",
        "LEAVE",
      ],
    })
    .then(function (respond) {
      if (message.choices === "View all employees") {
        showEmployees();}
        break;
        if (message.choices === 'View all departments' ) {
            showDepartmans();}
            break;
            if (message.choices ===   'View all roles') {
                showRoles();}
                break;
                if (message.choices ===   'Add an employee') {
                    addEmployee();}
                break;
                
            
        
      
    );
}
