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

function showDepartments() {
  // WHEN FUNCTION CALLED
  // RUN WISH WICH EQUAL TO MYSQL COMMENT
  const wish = "SELECT * FROM department";
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

function addEmployee() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err == true) {
      throw err;
    }
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employee's fist name? ",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the employee's last name? ",
        },
        {
          name: "manager_id",
          type: "input",
          message: "What is the employee's manager's ID? ",
        },
        {
          name: "role",
          type: "list",
          choices: function () {
            var roleArray = [];
            for (let i = 0; i < res.length; i++) {
              roleArray.push(res[i].title);
            }
            return roleArray;
          },
          message: "What is this employee's role? ",
        },
      ])
      .then(function (answer) {
        let role_id;
        for (let a = 0; a < res.length; a++) {
          if (res[a].title == answer.role) {
            role_id = res[a].id;
            console.log(role_id);
          }
        }
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            manager_id: answer.manager_id,
            role_id: role_id,
          },
          function (err) {
            if (err) throw err;
            console.log("Employee added!");
            options();
          }
        );
      });
  });
}
