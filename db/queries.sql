USE employeeDB;
SELECT
  *
FROM
  employee;
SELECT
  *
FROM
  department
ORDER BY
  id;
SELECT
  role.id,
  role.title,
  role.salary,
  department.name AS "department"
FROM
  role
  JOIN department ON role.department_id = department.id
ORDER BY
  role.id;
SELECT
  department_name,
  CONCAT("$", SUM(expense)) AS "department_budget"
FROM
  (
    SELECT
      CONCAT(e.first_name, " ", e.last_name) AS "name",
      role.salary AS "expense",
      d.department_name
    FROM
      employee AS e
      LEFT JOIN employee AS temp ON e.manager_id = temp.id
      JOIN role ON e.role_id = role.id
      JOIN (
        SELECT
          department.id as "department_id",
          department.name as "department_name"
        FROM
          role
          JOIN department ON role.department_id = role.id
      ) as d ON role.department_id = d.department_id
    ORDER BY
      e.id
  ) AS derivedTable
WHERE
  department_name = "Senior Management";
SELECT
  CONCAT(employee.first_name, " ", employee.last_name) AS "name"
FROM
  employee
ORDER BY
  id;
SELECT
  department.name AS "department Name",
  r.id,
  r.title,
  r.salary
FROM
  department
  JOIN role AS r ON r.department_id = department.id
ORDER by
  r.id;
DELETE FROM
  employee
WHERE
  CONCAT(first_name, " ", last_name) = "Michael Scott";
SELECT
  e.id,
  CONCAT(e.first_name, " ", e.last_name) AS "name",
  role.title,
  role.salary AS "salary",
  d.department_name,
  CONCAT(temp.first_name, " ", temp.last_name) AS "manager_name"
FROM
  employee AS e
  LEFT JOIN employee AS temp ON e.manager_id = temp.id
  JOIN role ON e.role_id = role.id
  JOIN (
    SELECT
      department.id as "department_id",
      department.name as "department_name"
    FROM
      role
      JOIN department ON role.department_id = role.id
  ) as d ON role.department_id = d.department_id
ORDER BY
  e.id;
UPDATE
  employee
SET
  role_id =(
    SELECT
      role.id
    FROM
      role
    WHERE
      title = "Regional Manager"
  )
WHERE
  CONCAT(first_name, " ", last_name) = "Dwight Schrute";
SELECT
  manager_name,
  derivedTable.name as "employee_name",
  derivedTable.department_name
FROM
  (
    SELECT
      e.id,
      CONCAT(e.first_name, " ", e.last_name) AS "name",
      role.title,
      role.salary AS "salary",
      d.department_name,
      CONCAT(temp.first_name, " ", temp.last_name) AS "manager_name"
    FROM
      employee AS e
      LEFT JOIN employee AS temp ON e.manager_id = temp.id
      JOIN role ON e.role_id = role.id
      JOIN (
        SELECT
          department.id as "department_id",
          department.name as "department_name"
        FROM
          role
          JOIN department ON role.department_id = role.id
      ) as d ON role.department_id = d.department_id
    ORDER BY
      e.id
  ) AS derivedTable
WHERE
  manager_name = "Dwight Schrute";