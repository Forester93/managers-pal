const inquirer = require("inquirer");
const Choices = require("inquirer/lib/objects/choices");

let inquirerData = [
  {
    type: "list",
    message:
      "Please select the employee to list the employees managed by him/her:",
    choices: [""],
    name: "manager",
  },
];

async function viewEmployeesByManager(connection, cTable) {
  let query = "";
  try {
    query = `SELECT CONCAT(first_name," ",last_name) AS "name" FROM employee ORDER BY id`;
    let [managers] = await connection.execute(query);
    managers = managers.map((item) => item.name);
    inquirerData[0].choices = managers;

    let response = await inquirer.prompt(inquirerData);

    query = `SELECT manager_name, derivedTable.name as "employee_name", derivedTable.department_name
    FROM (SELECT
    e.id,
    CONCAT(e.first_name," ",e.last_name) AS "name",
    role.title,
      role.salary AS "salary",
      d.department_name,
      CONCAT(temp.first_name," ",temp.last_name) AS "manager_name"
    FROM
      employee AS e
      LEFT JOIN employee AS temp ON e.manager_id = temp.id
      JOIN role ON e.role_id = role.id
      JOIN (SELECT department.id as "department_id",department.name as "department_name" FROM role JOIN department ON role.department_id=role.id) as d ON role.department_id=d.department_id
    ORDER BY
      e.id) AS derivedTable
      WHERE manager_name=?`;

    //get results
    let [result] = await connection.execute(query, [response.manager]);
    const table = cTable.getTable(result);
    console.log(table);
  } catch (err) {
    console.error(err);
  }
}

module.exports = viewEmployeesByManager;
