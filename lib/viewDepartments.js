async function viewDepartments(connection) {
  const query = "SELECT * FROM department ORDER BY id";
  try {
    let [res] = await connection.execute(query);
    res.forEach((item) => {
      console.log(
        `Department ID: ${item["id"]} || Department: ${item["name"]}`
      );
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = viewDepartments;
