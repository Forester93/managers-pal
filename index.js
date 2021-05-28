const inquirer = require("inquirer");

// My Packages

const addDepartment = require("./lib/addDepartment");
const addRole = require("./lib/addRole");
const addEmployee = require("./lib/addEmployee");
const viewDepartments = require("./lib/viewDepartments");

// Connect DB
require("dotenv").config();
const mysql = require("mysql2/promise");

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
// connection.connect((err) => {
//   if (err) throw err;
//   console.log("Database Connected Successfully");
// });

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
          "Update Employee Data",
          "Update Employee Manager",
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
          addDepartment().then(() => makeChoice());
          break;
        case "Add Role":
          addRole().then(() => makeChoice());
          break;
        case "Add Employee":
          addEmployee().then(() => makeChoice());
          break;
        case "View Departments":
          viewDepartments(connection).then(() => makeChoice());
          break;
        case "View Roles":
          break;
        case "View Employees":
          break;
        case "Update Employee Data":
          break;
        case "Update Employee Manager":
          break;
        case "Delete Department":
          break;
        case "Delete Role":
          break;
        case "Delete Employee":
          break;
        case "View Department's Budget":
          break;
        case "Exit":
          console.log("See you soon!"); //Goodbye prompt
      }
    })
    .catch((err) => {
      console.log("Something went wrong\n");
      console.error(err);
    });
}

const artistSearch = () => {
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What artist would you like to search for?",
    })
    .then((answer) => {
      const query = "SELECT position, song, year FROM top5000 WHERE ?";
      connection.query(query, { artist: answer.artist }, (err, res) => {
        if (err) throw err;
        res.forEach(({ position, song, year }) => {
          console.log(
            `Position: ${position} || Song: ${song} || Year: ${year}`
          );
        });
        runSearch();
      });
    });
};

const multiSearch = () => {
  const query =
    "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
  connection.query(query, (err, res) => {
    if (err) throw err;
    res.forEach(({ artist }) => console.log(artist));
    runSearch();
  });
};

const rangeSearch = () => {
  inquirer
    .prompt([
      {
        name: "start",
        type: "input",
        message: "Enter starting position: ",
        validate(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending position: ",
        validate(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
    ])
    .then((answer) => {
      const query =
        "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], (err, res) => {
        if (err) throw err;
        res.forEach(({ position, song, artist, year }) =>
          console.log(
            `Position: ${position} || Song: ${song} || Artist: ${artist} || Year: ${year}`
          )
        );
        runSearch();
      });
    });
};

const songSearch = () => {
  inquirer
    .prompt({
      name: "song",
      type: "input",
      message: "What song would you like to look for?",
    })
    .then((answer) => {
      console.log(`You searched for "${answer.song}"`);
      connection.query(
        "SELECT * FROM top5000 WHERE ?",
        { song: answer.song },
        (err, res) => {
          if (err) throw err;
          if (res[0]) {
            console.log(
              `Position: ${res[0].position} || Song: ${res[0].song} || Artist: ${res[0].artist} || Year: ${res[0].year}`
            );
            runSearch();
          } else {
            console.error("Song not found :(\n");
            runSearch();
          }
        }
      );
    });
};
