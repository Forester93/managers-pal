async function viewRoles(connection, cTable) {
  const query = `SELECT role.id, role.title,role.salary,department.name AS "department" FROM role JOIN department ON role.department_id=department.id ORDER BY role.id;`;
  try {
    let [res] = await connection.execute(query);
    const table = cTable.getTable(res);
    console.log(table);
  } catch (err) {
    console.error(err);
  }
}

module.exports = viewRoles;
