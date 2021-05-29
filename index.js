const inquirer = require("inquirer");
const fs = require("fs");
const cTable = require("console.table");
const Path = require("path");

// ASCIIFY

const asciify = require("asciify");

// My Packages

const addDepartment = require("./lib/addDepartment");
const addRole = require("./lib/addRole");
const addEmployee = require("./lib/addEmployee");
const viewDepartments = require("./lib/viewDepartments");
const viewRoles = require("./lib/viewRoles");
const viewBudgetByDepartment = require("./lib/viewBudgetByDepartment");
const viewEmployees = require("./lib/viewEmployees");
const deleteEmployee = require("./lib/deleteEmployee");
const deleteRole = require("./lib/deleteRole");
const deleteDepartment = require("./lib/deleteDepartment");
const updateRole = require("./lib/updateRole");
const updateManager = require("./lib/updateManager");
const viewEmployeesByManager = require("./lib/viewEmployeesByManager");

// Connect DB
require("dotenv").config();
const mysql = require("mysql2/promise");

// Define Global DB Connection

let connection;
async function connect() {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

asciify("Manager's Pal", (err, res) => {
  console.log(res);
  console.log("\nWelcome to Manager's Pal\n");
  setDotEnv();
  if (err) return;
});

// set environment variables

function setDotEnv() {
  const path = Path.join(__dirname, ".env");

  if (fs.existsSync(path) == true) {
    connect().then(() => {
      makeChoice();
    });
  } else {
    // file does not exist
    inquirer
      .prompt([
        {
          type: "password",
          name: "dbName",
          message: "Please Enter the Database Name: ",
        },
        {
          type: "password",
          name: "dbUser",
          message: "Please Enter the Database User Name: ",
        },
        {
          type: "password",
          name: "dbPassword",
          message: "Please Enter the Database Password: ",
        },
        {
          type: "password",
          name: "dbHost",
          message: "Please Enter the Host Address: ",
        },
        {
          type: "password",
          name: "dbPort",
          message: "Please Enter the Connection Port: ",
        },
      ])
      .then((response) => {
        let envFile = `DB_HOST=${response.dbHost}\nDB_NAME=${response.dbName}\nDB_USER=${response.dbUser}\nDB_PASS=${response.dbPassword}\nDB_PORT=${response.dbPort}`;
        fs.writeFileSync(".env", envFile);
        require("dotenv").config();
        connect().then(() => {
          makeChoice();
        });
      });
  }
}

//to get the next choice from the user
function makeChoice() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "next",
        choices: [
          "Add Department",
          "Add Role",
          "Add Employee",
          "View Departments",
          "View Roles",
          "View Employees",
          "Update Employee's Role",
          "Update Employee's Manager",
          "View Employees by Manager",
          "Delete Department",
          "Delete Role",
          "Delete Employee",
          "View Department's Budget",
          "Exit",
        ],
      },
    ])
    .then((response) => {
      switch (response.next) {
        case "Add Department":
          addDepartment(connection).then(() => makeChoice());
          break;
        case "Add Role":
          addRole(connection).then(() => makeChoice());
          break;
        case "Add Employee":
          addEmployee(connection).then(() => makeChoice());
          break;
        case "View Departments":
          viewDepartments(connection, cTable).then(() => makeChoice());
          break;
        case "View Roles":
          viewRoles(connection, cTable).then(() => makeChoice());
          break;
        case "View Employees":
          viewEmployees(connection, cTable).then(() => makeChoice());
          break;
        case "Update Employee's Role":
          updateRole(connection).then(() => makeChoice());
          break;
        case "Update Employee's Manager":
          updateManager(connection).then(() => makeChoice());
          break;
        case "View Employees by Manager":
          viewEmployeesByManager(connection, cTable).then(() => makeChoice());
          break;
        case "Delete Department":
          deleteDepartment(connection).then(() => makeChoice());
          break;
        case "Delete Role":
          deleteRole(connection).then(() => makeChoice());
          break;
        case "Delete Employee":
          deleteEmployee(connection).then(() => makeChoice());
          break;
        case "View Department's Budget":
          viewBudgetByDepartment(connection, cTable).then(() => makeChoice());
          break;
        case "Exit":
          console.log("See you soon!"); //Goodbye prompt
          process.exit();
      }
    })
    .catch((err) => {
      console.log("Something went wrong\n");
      console.error(err);
    });
}
