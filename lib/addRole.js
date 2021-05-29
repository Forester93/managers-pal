const inquirer = require("inquirer");
const Choices = require("inquirer/lib/objects/choices");
const dbContains = require("./dbContains");

let inquirerData = [
  {
    type: "input",
    message: "Please Enter the Role title: ",
    name: "title",
  },
  {
    type: "input",
    message: "Please Enter the Role Annual Salary: ",
    name: "salary",
  },
  {
    type: "list",
    message: "Please Select the Department: ",
    choices: [""],
    name: "departmentName",
  },
];

async function addRole(connection) {
  let query = "";

  try {
    query = `SELECT * FROM department ORDER BY id`;
    let [departments] = await connection.execute(query);
    departments = departments.map((item) => item.name);
    inquirerData[2].choices = departments;

    query = `SELECT * FROM role ORDER BY id`;
    let [roles] = await connection.execute(query);
    let response = await inquirer.prompt(inquirerData);
    if (dbContains(roles, "title", response.title)) {
      throw "Error: A Role with the same name already exists";
    } else {
      let add = await connection.execute(
        "INSERT INTO role (title,salary,department_id) VALUES (?,?,(SELECT id FROM department WHERE name=?))",
        [response.title, response.salary, response.departmentName]
      );
      console.log(
        `${response.title} Role was successfully added to the Database.`
      );
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = addRole;
