const inquirer = require("inquirer");
const cTable = require("console.table");

// ASCIIFY

const asciify = require("asciify");

asciify("Manager's Pal", (err, res) => {
  console.log(res);
  console.log("\nWelcome to Manager's Pal\n");
  if (err) return;
});

// My Packages

const addDepartment = require("./lib/addDepartment");
const addRole = require("./lib/addRole");
const addEmployee = require("./lib/addEmployee");
const viewDepartments = require("./lib/viewDepartments");
const viewRoles = require("./lib/viewRoles");
const viewBudgetByDepartment = require("./lib/viewBudgetByDepartment");
const viewEmployees = require("./lib/viewEmployees");
const deleteEmployee = require("./lib/deleteEmployee");

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
  }
}
connect().then(() => {
  makeChoice();
});

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
          "Update Employee's Data",
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
        case "Update Employee's Data":
          break;
        case "Update Employee's Manager":
          break;
        case "Delete Department":
          break;
        case "Delete Role":
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
