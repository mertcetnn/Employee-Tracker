const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTbl = require("console.table");

// THIS PART HELPS US TO CONNECT OUR LOCAL HOST
const con = mysql.createConnection({
  host: "localhost",
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
      switch (respond.greeting) {
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

      console.table("All Employees:", res);
      choices();
    });
  });
}

function showDepartments() {
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM department", function (err, res) {
      if (err) throw err;

      console.table("All department:", res);
      choices();
    });
  });
}
function showRoles() {
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM role", function (err, res) {
      if (err) throw err;

      console.table("All Roles:", res);
      choices();
    });
  });
}
choices();

function addDepartment() {
  con.connect(function (err) {
    inquirer
      .prompt([
        {
          name: "addDepartment",
          type: "input",
          message: "Which Department would you like to add?",
        },
      ])
      .then((data) => {
        con.query(
          "INSERT INTO  department (name) VALUES (?)",
          data.addDepartment,
          function (err, res) {
            if (err) throw err;
            choices();
          }
        );
      });
  });
}

function addRole() {
  con.connect(function (err) {
    inquirer
      .prompt([
        {
          name: "addRole",
          type: "input",
          message: "What is your role in company?",
        },
        {
          name: "addSalary",
          type: "input",
          message: "What is your salary incompany?",
        },
        {
          name: "addDepartmentId",
          type: "input",
          message: "What is your Deaprtment ID??",
        },
      ])
      .then((data) => {
        con.query(
          "INSERT INTO  role (title, salary ,department_id) VALUES (?,?,?)",
          [data.addRole, data.addSalary, data.addDepartmentId],
          function (err, res) {
            if (err) throw err;
            choices();
          }
        );
      });
  });
}

function addEmployee() {
  con.connect(function (err) {
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
      .then((data) => {
        con.query(
          "INSERT INTO  employee (first_name, last_name ,manager_id,role) VALUES (?,?,?)",
          [data.addRole, data.addSalary, data.addDepartmentId],
          function (err, res) {
            if (err) throw err;
            choices();
          }
        );
      });
  });
}
function updateRole() {
  //update statment
  let sql = `UPDATE role
           SET completed = ?
           WHERE id = ?`;

  con.query(
    `UPDATE role
           SET (title, salary ,department_id) = ?
           WHERE department_id = ?`
  );
}
//exit the app
function exitApp() {
  connection.end();
}
