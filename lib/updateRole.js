const inquirer = require("inquirer");
const Choices = require("inquirer/lib/objects/choices");
const dbContains = require("../util/dbContains");

let inquirerData = [
  {
    type: "list",
    message: "Please Select the Employee: ",
    name: "employeeName",
    choices: [""],
  },
  {
    type: "list",
    message: "Please Select the Employee's New Role:",
    choices: [""],
    name: "newRole",
  },
];

async function updateRole(connection) {
  let query = "";

  try {
    // set available employees choices
    query = `SELECT employee.id, CONCAT(employee.first_name," ",employee.last_name) AS "name" FROM employee ORDER BY employee.id`;
    let [employees] = await connection.execute(query);
    employees = employees.map((item) => item.name);
    inquirerData[0].choices = employees;

    // set available role choices
    query = `SELECT * FROM role ORDER BY id`;
    let [roles] = await connection.execute(query);
    roles = roles.map((item) => item.title);
    inquirerData[1].choices = roles;

    //get user input
    let response = await inquirer.prompt(inquirerData);

    let action = await connection.execute(
      `UPDATE employee
    SET role_id =(SELECT role.id FROM role WHERE title=?)
    WHERE CONCAT(first_name," ",last_name)=?`,
      [response.newRole, response.employeeName]
    );

    // Success
    console.log(
      `Mr./Mrs./Ms. ${response.employeeName}'s role was successfully updated.`
    );
  } catch (err) {
    //error handling
    console.error(err);
  }
}

module.exports = updateRole;
