async function viewDepartments(connection, cTable) {
  const query = "SELECT * FROM department ORDER BY id";
  try {
    let [res] = await connection.execute(query);
    const table = cTable.getTable(res);
    console.log(table);
  } catch (err) {
    console.error(err);
  }
}

module.exports = viewDepartments;
