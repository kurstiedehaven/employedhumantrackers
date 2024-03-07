-- seed database here
INSERT INTO DEPARTMENT (department_name)
VALUES ('Human Resources'),
       ('Accounting'),
       ('Admin'),
       ('Production'),
       ('Management'),
       ('IT'),
       ('Sales');

INSERT INTO DEPARTMENT_ROLE (title, salary, department_id)
VALUES ('HR Manager', 100000, 1),
       ('HR Assistant', 50000, 1),
       ('Accountant', 60000, 2),
       ('Accounting Assistant', 40000, 2),
       ('Admin Manager', 80000, 3),
       ('Admin Assistant', 40000, 3),
       ('Production Manager', 90000, 4),
       ('Production Assistant', 50000, 4),
       ('CEO', 200000, 5),
       ('CFO', 150000, 5),
       ('IT Manager', 100000, 6),
       ('IT Assistant', 50000, 6),
       ('Sales Manager', 100000, 7),
       ('Sales Assistant', 50000, 7);

INSERT INTO EMPLOYEES (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Smith', 1, NULL),
       ('Mary', 'Johnson', 2, 1),
       ('Michael', 'Williams', 3, NULL),
       ('Jennifer', 'Brown', 4, 3),
       ('James', 'Jones', 5, NULL),
       ('David', 'Miller', 6, 5),
       ('Elizabeth', 'Wilson', 7, NULL),
       ('Laura', 'Thompson', 8, 7),
       ('Tony', 'Stark', 9, NULL),
       ('Spider', 'Man', 10, 9),
       ('Emily', 'Martinez', 11, NULL),
       ('Crissy', 'Fender', 12, 11),
       ('Lorna', 'Burns', 13, NULL),
       ('Jesse', 'Vargas', 14, 13);

