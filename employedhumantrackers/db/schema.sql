-- create data base here
DROP DATABASE IF EXISTS employedhumantrackers;
CREATE DATABASE employedhumantrackers;

-- use the database
USE employedhumantrackers;

-- create the table
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
    FOREIGN KEY (role_id)
    REFERENCES department_role(id),
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
);

CREATE TABLE department_role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(25) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE department (
    id INTO NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(25) NOT NULL,
    PRIMARY KEY (id)
);