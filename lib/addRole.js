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
    message: "Please Enter the Department Name: ",
    name: "department_name",
  },
];

function addRole() {
  // let query;
  // try {
  //   query = `SELECT role.id, role.title,role.salary,department.name AS "department" FROM role JOIN department ON role.department_id=department.id ORDER BY role.id;`;
  //   let [roles] = await connection.execute(query);
  //   query = `SELECT * FROM department ORDER BY id`;
  //   let [departments] = await connection.execute(query);
  // } catch (err) {
  //   console.error(err);
  // }
  // return inquirer.prompt(inquirerData).then((response) => {
  //   let err=new Error();
  //   if()
  // });
}

module.exports = addRole;
