const inquirer = require("inquirer");
const Choices = require("inquirer/lib/objects/choices");

let inquirerData = [
  {
    type: "list",
    message: "Warning! This will delete all employees with this role title: ",
    choices: [""],
    name: "redundantRole",
  },
];

async function deleteRole(connection) {
  let query = "";

  try {
    // set available employees chioces
    query = `SELECT role.id, role.title FROM role ORDER BY role.id`;
    let [redundantRole] = await connection.execute(query);
    redundantRole = redundantRole.map((item) => item.title);
    inquirerData[0].choices = redundantRole;

    //get user input
    let response = await inquirer.prompt(inquirerData);

    //out you go...
    let action = await connection.execute(`DELETE FROM role WHERE title=?`, [
      response.redundantRole,
    ]);
    console.log(
      `${response.redundantRole} Role was successfully removed from the database.`
    );
  } catch (err) {
    //error handling
    console.error(err);
  }
}

module.exports = deleteRole;
