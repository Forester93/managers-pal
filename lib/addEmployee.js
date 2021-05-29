const inquirer = require("inquirer");
const Choices = require("inquirer/lib/objects/choices");
const dbContains = require("./dbContains");

let inquirerData = [
  {
    type: "input",
    message: "Please Enter the Employee's First Name: ",
    name: "first_name",
  },
  {
    type: "input",
    message: "Please Enter the Employee's Last Name: ",
    name: "last_name",
  },
  {
    type: "list",
    message: "Please Select the Employee's Role:",
    choices: [""],
    name: "role",
  },
  {
    type: "list",
    message: "Please Select the Employee's Manager: ",
    choices: [""],
    name: "manager",
  },
];

async function addEmployee(connection) {
  let query = "";

  try {
    // set available role choices
    query = `SELECT * FROM role ORDER BY id`;
    let [roles] = await connection.execute(query);
    roles = roles.map((item) => item.title);
    console.log(roles);
    inquirerData[2].choices = roles;

    // set available managers chioces
    query = `SELECT employee.id, CONCAT(employee.first_name," ",employee.last_name) AS "name" FROM employee ORDER BY employee.id`;
    let [managers] = await connection.execute(query);
    managers = managers.map((item) => item.name);
    console.log(managers);
    inquirerData[3].choices = [...managers, "None"];

    //get a list of current employees
    query = `SELECT CONCAT(employee.first_name," ",employee.last_name) AS "name" FROM employee ORDER BY id`;
    let [employees] = await connection.execute(query);

    //get user input
    let response = await inquirer.prompt(inquirerData);
    //Check Duplicates
    if (
      dbContains(
        employees,
        "name",
        response.first_name + " " + response.last_name
      )
    ) {
      throw "Error: An Employee with the same name already exists";
    } else {
      //getting the specific manager's ID, if any
      let managerID;
      if (response.manager == "none") {
        managerID = "NULL";
      } else {
        query = `SELECT id FROM employee WHERE CONCAT(employee.first_name," ",employee.last_name)=?`;
        let [managerID] = await connection.execute(query, [response.manager]);
        managerID = managerID.map((item) => item.id);
        console.log(managerID);
        let add = await connection.execute(
          "INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,(SELECT id FROM role WHERE title=?),?)",
          [
            response.first_name,
            response.last_name,
            response.role,
            parseInt(managerID),
          ]
        );
        // Success
        console.log(
          `Mr./Mrs./Ms. ${
            response.first_name + " " + response.last_name
          } was successfully added to the Database.`
        );
      }
    }
  } catch (err) {
    //error handling
    console.error(err);
  }
}

module.exports = addEmployee;
