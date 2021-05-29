async function viewEmployees(connection, cTable) {
  const query = `SELECT
  e.id,
  CONCAT(e.first_name, " ", e.last_name) AS "full name",
  role.title AS "role",
  CONCAT("$", role.salary) AS "salary",
  CONCAT(temp.first_name, " ", temp.last_name) AS "manager"
FROM
  employee AS e
  LEFT JOIN employee AS temp ON e.manager_id = temp.id
  JOIN role ON e.role_id = role.id
ORDER BY
  e.id;`;
  try {
    let [res] = await connection.execute(query);
    const table = cTable.getTable(res);
    console.log(table);
  } catch (err) {
    console.error(err);
  }
}

module.exports = viewEmployees;
