DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;
CREATE TABLE department(
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR (30) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);
CREATE TABLE role(
  id INTEGER NOT NULL AUTO_INCREMENT,
  title varchar(30),
  salary DECIMAL (11, 2),
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE CASCADE
);
CREATE TABLE employee(
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR (30) NOT NULL,
  last_name VARCHAR (30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE
  SET
    NULL
);
INSERT INTO
  department (name)
VALUES
  ("Senior Management"),("Human Resources & Admin"),("Sales"),("Warehouse"),("Accounting"),("Manufacturing");
INSERT INTO
  role (title, salary, department_id)
VALUES
  (
    "Regional Manager",
    200000,
    (
      SELECT
        id
      FROM
        department
      WHERE
        name = "Senior Management"
    )
  ),
  (
    "Assistant Regional Manager",
    120000,
    (
      SELECT
        id
      FROM
        department
      WHERE
        name = "Senior Management"
    )
  ),
  (
    "Human Resources Coordinator",
    95000,
    (
      SELECT
        id
      FROM
        department
      WHERE
        name = "Human Resources & Admin"
    )
  ),
  (
    "Head of Sales",
    150000,
    (
      SELECT
        id
      FROM
        department
      WHERE
        name = "Sales"
    )
  ),
  (
    "Salesperson",
    100000,
    (
      SELECT
        id
      FROM
        department
      WHERE
        name = "Sales"
    )
  ),
  (
    "Warehouse Foreman",
    65000,
    (
      SELECT
        id
      FROM
        department
      WHERE
        name = "Warehouse"
    )
  ),
  (
    "Warehouse Worker",
    50000,
    (
      SELECT
        id
      FROM
        department
      WHERE
        name = "Warehouse"
    )
  ),
  (
    "Chief Financial Officer",
    100000,
    (
      SELECT
        id
      FROM
        department
      WHERE
        name = "Accounting"
    )
  ),
  (
    "Accountant",
    80000,
    (
      SELECT
        id
      FROM
        department
      WHERE
        name = "Accounting"
    )
  ),
  (
    "Quality Assurance Officer",
    80000,
    (
      SELECT
        id
      FROM
        department
      WHERE
        name = "Senior Management"
    )
  ),
  (
    "Customer Service Rep",
    75000,
    (
      SELECT
        id
      FROM
        department
      WHERE
        name = "Sales"
    )
  ),
  (
    "Supplier Relations Coordinator",
    75000,
    (
      SELECT
        id
      FROM
        department
      WHERE
        name = "Warehouse"
    )
  ),
  (
    "Head of Manufacturing",
    160000,
    (
      SELECT
        id
      FROM
        department
      WHERE
        name = "Manufacturing"
    )
  ),
  (
    "Manufacturing Engineer",
    110000,
    (
      SELECT
        id
      FROM
        department
      WHERE
        name = "Manufacturing"
    )
  ),
  (
    "Manufacturing Technician",
    100000,
    (
      SELECT
        id
      FROM
        department
      WHERE
        name = "Manufacturing"
    )
  ),
  (
    "Office Administrator",
    45000,
    (
      SELECT
        id
      FROM
        department
      WHERE
        name = "Human Resources & Admin"
    )
  );
INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
VALUES
  (
    "Michael",
    "Scott",
    (
      SELECT
        id
      FROM
        role
      WHERE
        title = "Regional Manager"
    ),
    NULL
  );
INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
VALUES
  (
    "Dwight",
    "Schrute",
    (
      SELECT
        id
      FROM
        role
      WHERE
        title = "Assistant Regional Manager"
    ),
    1
  );
INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
VALUES
  (
    "Darryl",
    "Phillbin",
    (
      SELECT
        id
      FROM
        role
      WHERE
        title = "Warehouse Foreman"
    ),
    2
  ),
  (
    "Creed",
    "Bratton",
    (
      SELECT
        id
      FROM
        role
      WHERE
        title = "Quality Assurance Officer"
    ),
    1
  ),
  (
    "Angela",
    "Martin",
    (
      SELECT
        id
      FROM
        role
      WHERE
        title = "Chief Financial Officer"
    ),
    1
  ),
  (
    "Oscar",
    "Martinez",
    (
      SELECT
        id
      FROM
        role
      WHERE
        title = "Accountant"
    ),
    5
  ),
  (
    "John",
    "Smith",
    (
      SELECT
        id
      FROM
        role
      WHERE
        title = "Warehouse Worker"
    ),
    3
  ),
  (
    "Andy",
    "Bernard",
    (
      SELECT
        id
      FROM
        role
      WHERE
        title = "Head of Sales"
    ),
    1
  ),
  (
    "Kelly",
    "Kapoor",
    (
      SELECT
        id
      FROM
        role
      WHERE
        title = "Customer Service Rep"
    ),
    8
  ),
  (
    "Meredith",
    "Palmer",
    (
      SELECT
        id
      FROM
        role
      WHERE
        title = "Customer Service Rep"
    ),
    8
  ),
  (
    "Joey",
    "Liu",
    (
      SELECT
        id
      FROM
        role
      WHERE
        title = "Head of Manufacturing"
    ),
    1
  ),
  (
    "John",
    "Doe",
    (
      SELECT
        id
      FROM
        role
      WHERE
        title = "Manufacturing Engineer"
    ),
    11
  ),
  (
    "Linsey",
    "Lin",
    (
      SELECT
        id
      FROM
        role
      WHERE
        title = "Manufacturing Engineer"
    ),
    11
  ),
  (
    "Tyrone",
    "Lee",
    (
      SELECT
        id
      FROM
        role
      WHERE
        title = "Manufacturing Technician"
    ),
    11
  ),
  (
    "Celine",
    "Harlow",
    (
      SELECT
        id
      FROM
        role
      WHERE
        title = "Human Resources Coordinator"
    ),
    2
  ),
  (
    "Pam",
    "Beesly",
    (
      SELECT
        id
      FROM
        role
      WHERE
        title = "Office Administrator"
    ),
    2
  ),
  (
    "Jim",
    "Halpert",
    (
      SELECT
        id
      FROM
        role
      WHERE
        title = "Assistant Regional Manager"
    ),
    1
  );
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
  
SELECT department_name,CONCAT("$",SUM(expense) ) AS "department_budget"
FROM (SELECT
CONCAT(e.first_name," ",e.last_name) AS "name",
  role.salary AS "expense",
  d.department_name
FROM
  employee AS e
  LEFT JOIN employee AS temp ON e.manager_id = temp.id
  JOIN role ON e.role_id = role.id
  JOIN (SELECT department.id as "department_id",department.name as "department_name" FROM role JOIN department ON role.department_id=role.id) as d ON role.department_id=d.department_id
ORDER BY
  e.id) AS derivedTable
  WHERE department_name="Senior Management";
  
  
  
  SELECT CONCAT(employee.first_name," ",employee.last_name) AS "name" FROM employee ORDER BY id;
  
  SELECT 
   department.name AS "department Name",
  r.id, r.title, r.salary
  FROM
 department JOIN   role AS r
  ON r.department_id=department.id
  ORDER by r.id;
  
  DELETE FROM employees WHERE CONCAT(first_name," ",last_name)="Michael Scott";