const inquirer = require("inquirer");

let inquirerData = [
  {
    type: "input",
    message: "Please Enter the Department's name: ",
    name: "name",
  },
];

function addDepartment() {
  return inquirer.prompt(inquirerData).then((response) => {
    console.log(response.name);
  });
}

module.exports = addDepartment;
