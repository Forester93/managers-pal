const inquirer = require("inquirer");

let inquirerData = [
  {
    type: "input",
    message: "Please Enter the Role Name: ",
    name: "name",
  },
  {
    type: "input",
    message: "Please Enter the Role Salary: ",
    name: "salary",
  },
  {
    type: "input",
    message: "Please Enter the Department ID: ",
    name: "salary",
  },
];

function addRole() {
  return inquirer.prompt(inquirerData).then((response) => {
    console.log([response.name, response.salary, response.department_id]);
  });
}

module.exports = addRole;
