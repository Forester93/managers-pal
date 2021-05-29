const inquirer = require("inquirer");
const Choices = require("inquirer/lib/objects/choices");

let inquirerData = [
  {
    type: "list",
    message: "Warning! This will delete all employees in this department: ",
    choices: [""],
    name: "redundantDepartment",
  },
];

async function deleteDepartment(connection) {
  let query = "";

  try {
    // set available employees chioces
    query = `SELECT department.name FROM department ORDER BY department.id`;
    let [redundantDepartment] = await connection.execute(query);
    redundantDepartment = redundantDepartment.map((item) => item.name);
    inquirerData[0].choices = redundantDepartment;

    //get user input
    let response = await inquirer.prompt(inquirerData);

    //out you go...
    let action = await connection.execute(
      `DELETE FROM department WHERE name=?`,
      [response.redundantDepartment]
    );
    console.log(
      `${response.redundantDepartment} department was successfully removed from the database.`
    );
  } catch (err) {
    //error handling
    console.error(err);
  }
}

module.exports = deleteDepartment;
