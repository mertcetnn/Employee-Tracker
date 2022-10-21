const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTbl = require("console.table");

// THIS PART HELPS US TO CONNECT OUR LOCAL HOST
const con = mysql.createConnection({
  host: "localhost",
  port: 3301,
  user: "root",
  password: "password",
  database: "employees_db",
});

con.connect((err) => {
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
      // SEARCH ALL ACTIONS AND CHANGES CASES FOR SITUATION
      switch (respond.action) {
        case "View all employees":
          showEmployees();
          break;
        case "View all departments":
          showDepartments();
          break;
        case "View all roles":
          showRoles();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Update employee role":
          updateRole();
          break;
        case "Delete an employee":
          deleteEmployee();
          break;
        case "EXIT":
          exitApp();
          break;
        // AFTER ALL LASST VIEW
        default:
          break;
      }
    });
}

function showEmployees() {
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      console.log(result);
      console.table("All Employees:", res);
      choices();
    });
  });
}

function showDepartments() {
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM Departments", function (err, res) {
      if (err) throw err;
      console.log(result);
      console.table("All Deaprtments:", res);
      choices();
    });
  });
}
function showRoles() {
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM Role", function (err, res) {
      if (err) throw err;
      console.log(result);
      console.table("All Roles:", res);
      choices();
    });
  });
}

function addEmployee() {
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM Role", function (err, res) {
      if (err) throw err;
      inquirer.prompt([
        {

        name: 'first_name',
        type: 'input', 
        message: "What is the employee's fist name? "},
        {

          name: 'last_name',
          type: 'input', 
          message: "What is the employee's last name? "},
          {
            name: 'manager_id',
            type: 'input', 
            message: "What is the employee's manager's ID? "
        },
  
    ])





}
