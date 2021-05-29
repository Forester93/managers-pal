const inquirer = require("inquirer");
const Choices = require("inquirer/lib/objects/choices");

let inquirerData = [
  {
    type: "list",
    message: "Warning! This will delete the selected employee: ",
    choices: [""],
    name: "fired",
  },
];

async function deleteEmployee(connection) {
  let query = "";

  try {
    // set available employees chioces
    query = `SELECT employee.id, CONCAT(employee.first_name," ",employee.last_name) AS "name" FROM employee ORDER BY employee.id`;
    let [fireMe] = await connection.execute(query);
    fireMe = fireMe.map((item) => item.name);
    inquirerData[0].choices = fireMe;

    //get user input
    let response = await inquirer.prompt(inquirerData);

    //out you go...
    let action = await connection.execute(
      `DELETE FROM employee WHERE CONCAT(first_name," ",last_name)=?`,
      [response.fired]
    );
    console.log(
      `${response.fired} was successfully removed from the database.`
    );
  } catch (err) {
    //error handling
    console.error(err);
  }
}

module.exports = deleteEmployee;
