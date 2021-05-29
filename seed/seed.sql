USE employeeDB;
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