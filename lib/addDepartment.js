const inquirer = require("inquirer");
const dbContains = require("./dbContains");

let inquirerData = [
  {
    type: "input",
    message: "Please Enter the Department's name: ",
    name: "name",
  },
];

async function addDepartment(connection) {
  let query = "";

  try {
    //get a list of available departments
    query = `SELECT * FROM department ORDER BY id`;
    let [departments] = await connection.execute(query);
    let response = await inquirer.prompt(inquirerData);
    // check if department already exists
    if (dbContains(departments, "name", response.name)) {
      throw "Error: Department Already Exists";
    } else {
      let add = await connection.execute(
        "INSERT INTO department (name) VALUES (?)",
        [response.name]
      );
      console.log(
        `${response.name} Department was successfully added to the Database.`
      );
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = addDepartment;
