const inquirer = require("inquirer");
const Choices = require("inquirer/lib/objects/choices");

let inquirerData = [
  {
    type: "list",
    message: "Please Select Department:",
    choices: [""],
    name: "department_name",
  },
];

async function viewBudgetByDepartment(connection, cTable) {
  let query = "";
  try {
    query = `SELECT * FROM department ORDER BY id`;
    let [departments] = await connection.execute(query);
    departments = departments.map((item) => item.name);
    inquirerData[0].choices = departments;

    let response = await inquirer.prompt(inquirerData);

    query = `SELECT department_name,CONCAT("$",SUM(expense) ) AS "department_budget"
  FROM (SELECT
    role.salary AS "expense",
    d.department_name
  FROM
    employee AS e
    LEFT JOIN employee AS temp ON e.manager_id = temp.id
    JOIN role ON e.role_id = role.id
    JOIN (SELECT department.id as "department_id",department.name as "department_name" FROM role JOIN department ON role.department_id=role.id) as d ON role.department_id=d.department_id
  ORDER BY
    e.id) AS derivedTable
    WHERE department_name=?`;

    let [budget] = await connection.execute(query, [response.department_name]);
    const table = cTable.getTable(budget);
    console.log(table);
  } catch (err) {
    console.error(err);
  }
}

module.exports = viewBudgetByDepartment;
