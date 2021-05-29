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
    message: "Please Select the Employee's New Manager:",
    choices: [""],
    name: "newManager",
  },
];

async function updateManager(connection) {
  let query = "";

  try {
    // set available employees choices
    query = `SELECT employee.id, CONCAT(employee.first_name," ",employee.last_name) AS "name" FROM employee ORDER BY employee.id`;
    let [employees] = await connection.execute(query);
    employees = employees.map((item) => item.name);
    inquirerData[0].choices = employees;
    inquirerData[1].choices = [...employees, "None"];

    //get user input
    let response = await inquirer.prompt(inquirerData);

    // make sure the same person isn't selected twice
    if (response.employeeName == response.newManager)
      throw "Error: employee and manager cannot be the same person.";

    //getting the specific manager's ID
    let managerID;
    if (response.newManager == "None") {
      managerID = "NULL";
    } else {
      query = `SELECT id FROM employee WHERE CONCAT(employee.first_name," ",employee.last_name)=?`;
      let [managerID] = await connection.execute(query, [response.newManager]);
      managerID = managerID.map((item) => item.id);

      //update Employee's Manager
      let action = await connection.execute(
        `UPDATE employee
    SET manager_id =?
    WHERE CONCAT(first_name," ",last_name)=?`,
        [managerID[0], response.employeeName]
      );

      // Success
      console.log(
        `Mr./Mrs./Ms. ${response.employeeName}'s manager was successfully updated to ${response.newManager}.`
      );
    }
  } catch (err) {
    //error handling
    console.error(err);
  }
}

module.exports = updateManager;
