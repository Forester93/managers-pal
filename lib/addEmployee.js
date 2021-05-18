const inquirer = require("inquirer");

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
    type: "input",
    message: "Please Enter the Employee's Role ID: ",
    name: "role_id",
  },
  {
    type: "input",
    message: "Please Enter the Employee's Manager's ID: ",
    name: "manager_id",
  },
];

function addRole() {
  return inquirer.prompt(inquirerData).then((response) => {
    console.log([
      response.first_name,
      response.last_name,
      response.role_id,
      response.manager_id,
    ]);
  });
}

module.exports = addRole;
