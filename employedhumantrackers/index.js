// logic for the employedhumantrackers
const inquirer = require('inquirer');
const mysql = require('mysql2');

// create the connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employedhumantrackers'
});

// Define the home function
function home() {
    // Prompt the user again for an action
    start();
}

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
                    console.log(results);
                    start();
                });
                break;
            case 'View all roles':
                db.query('SELECT * FROM role', (err, results) => {
                    console.log(results);
                    start();
                });
                break;
            case 'View all departments':
                db.query('SELECT * FROM department', (err, results) => {
                    console.log(results);
                    start();
                });
                break;
            case 'Add employee':
                inquirer.prompt([
                    // Input prompts for adding employee
                ]).then((answer) => {
                    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, results) => {
                        console.log('Employee added');
                        start();
                    });
                });
                break;
            case 'Add role':
                inquirer.prompt([
                    // Input prompts for adding role
                ]).then((answer) => {
                    db.query('INSERT INTO role SET ?', answer, (err, results) => {
                        console.log('Role added');
                        home();
                    });
                });
                break;
            case 'Add department':
                inquirer.prompt([
                    // Input prompts for adding department
                ]).then((answer) => {
                    db.query('INSERT INTO department (department_name) VALUES (?)', [answer.newDept], (err, results) => {
                        console.log('Department added');
                        home();
                    });
                });
                break;
            case 'Update employee role':
                db.query('SELECT * FROM employee', (err, results) => {
                    // check if function after id firstname lastname is correct
                    const employee = results.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));
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
                        const roleChange = [employeeId];

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
                                    console.log('Role updated');
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
                break;
        }
    });
}

// Start the application
start();
