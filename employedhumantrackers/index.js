// logic for the employedhumantrackers
const inquirer = require('inquirer');
const mysql = require('mysql2');

// create the connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employedhumantrackers'
},
console.log('Connected to the employedhumantrackers database.')
);

start();


// Prompt the user to select an option
async function start() {
    await inquirer.prompt({
        name: 'start',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'View all roles',
            'View all departments',
            'Add employee',
            'Add role',
            'Add department',
            'Update employee role',
            'Exit'
        ],
    })
    .then((answer) => {
        switch (answer.start) {
            case 'View all employees':
                db.query('SELECT * FROM employee', (err, results) => {
                    console.table(results);
                    start();
                });
                break;
            case 'View all roles':
                db.query('SELECT * FROM role', (err, results) => {
                    console.table(results);
                    start();
                });
                break;
            case 'View all departments':
                db.query('SELECT * FROM department', (err, results) => {
                    console.table(results);
                    start();
                });
                break;
            
            // Add employee, role, department
            case 'Add employee':
                inquirer.prompt([
                    {
                        name: 'first_name',
                        type: 'input',
                        message: 'Enter the employee first name',
                    },
                    {
                        name: 'last_name',
                        type: 'input',
                        message: 'Enter the employee last name',
                    },
                    {
                        name: 'role_id',
                        type: 'input',
                        message: 'Enter the employee role id',
                    },
                    {
                        name: 'manager_id',
                        type: 'input',
                        message: 'Enter the employee manager id',
                    },
                ]).then((answer) => {
                    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, results) => {
                        // console.log('Employee added');
                        start();
                    });
                });
                break;

            // Add role
            case 'Add role':
                inquirer.prompt([{
                    name: 'newRole',
                    type: 'input',
                    message: 'Enter the role title',
                },
                {
                    name: 'newSalary',
                    type: 'input',
                    message: 'Enter the role salary',
                },
                {
                    name: 'newDepartmentId',
                    type: 'input',
                    message: 'Enter the department id',
                }
                ]).then((answer) => {
                    db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',[answer.newRole, answer.newSalary, answer.newDeptarmentID], (err, results) => {
                        // console.log('Role added');
                        start();
                    });
                });
                break;

            // Add department
            case 'Add department':
                inquirer.prompt([
                    {
                        name: 'newDept',
                        type: 'input',
                        message: 'Enter the department name',
                    },
                ]).then((answer) => {
                    db.query('INSERT INTO department (department_name) VALUES (?)', [answer.newDept], (err, results) => {
                        start();
                    });
                });
                break;

            // Update employee role
            case 'Update employee role':
                db.query('SELECT * FROM employee', (err, results) => {
                    // check if function after id firstname lastname is correct
                    const employee = results.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
                    inquirer.prompt([
                        {
                            name: 'employee',
                            type: 'list',
                            message: 'Select the employee to update',
                            choices: employee,
                        },
                    ])
                    .then((answer) => {
                        const employeeId = answer.employee;
                        const roleChange = [];
                        roleChange.push(employeeId);

                        db.query('SELECT * FROM role', (err, results) => {
                            const role = results.map(({ id, title }) => ({ name: title, value: id }));
                            inquirer.prompt([
                                {
                                    name: 'role',
                                    type: 'list',
                                    message: 'Select the new role',
                                    choices: role,
                                },
                            ])
                            .then((answer) => {
                                const newRoleId = answer.role;
                                roleChange.push(newRoleId);
                                db.query('UPDATE employee SET role_id = ? WHERE id = ?', roleChange, (err, results) => {
                                    start();
                                });
                            });
                        });
                    });
                });
                break;

            case 'Exit':
                console.log('Goodbye');
                process.exit();
        }
    });
};
