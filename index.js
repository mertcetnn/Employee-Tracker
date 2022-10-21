const mysql = require("mysql2");
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
      // SEARCH ALL ACTIONS AND CHANGES CASES FOR SITUATION
      switch (respond.action) {
        case "View all employees":
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

  function showDepartments() {
    // WHEN FUNCTION CALLED
    // RUN WISH WICH EQUAL TO MYSQL COMMENT
    const wish = "SELECT * FROM  department";
    // query() of mysql.Connection THEN USE WISH AND GET RESPOND THEN CHECK ERROR
    connection.query(wish, function (err, res) {
      if (err == true) {
        throw err;
      }

      console.table("Departments", res);
      choices();
    });
  }

  function showEmployees() {
    // WHEN FUNCTION CALLED
    // RUN WISH WICH EQUAL TO MYSQL COMMENT
    const wish = "SELECT * FROM employee";
    // query() of mysql.Connection THEN USE WISH AND GET RESPOND THEN CHECK ERROR
    connection.query(wish, function (err, res) {
      if (err == true) {
        throw err;
      }
      // SHOWS OUR RESPONDED LENGTH
      console.log(res.length + "Here is your team!");
      //     WILL SHOw Our data about employee
      console.table("All Employees:", res);
      choices();
    });
  }

  // view all roles in the database
  function showRoles() {
    var wish = "SELECT * FROM role";
    connection.query(wish, function (err, res) {
      if (err == true) {
        throw err;
      }
      console.table("All Roles:", res);
      choices();
    });
  }
}
choices();
