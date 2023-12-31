//REQUIREMENTS//
const mysql = require('mysql2');
const inquirer = require('inquirer');
//MYSQL CONNECTIONS///
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'company_db'
});

connection.connect((err) => {
    if (err) throw err;
    promptMenu();
});

//USER PROMPT//
function promptMenu() {
    inquirer.prompt([{
        type: 'list',
        name: 'reference',
        message: 'Choose an option',
        choices: ['Departments', 'Roles', 'Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit']
    }]
    )
        .then((answers) => {
            switch (answers.reference) {
                case 'Departments':
                    viewDepartments();
                    break;
                case 'Roles':
                    viewRoles();
                    break;
                case 'Employees':
                    viewEmployees();
                    break;
                case 'Add Department':
                    promptAddDepartment();
                    break;
                case 'Add Role':
                    promptAddRole();
                    break;
                case 'Add Employee':
                    promptAddEmployee();
                    break;
                case 'Update Employee Role':
                    promptUpdateEmployeeRole();
                    break;
                case 'Exit':
                    console.log('Goodbye!');
                    connection.end();
                    break;
            }
        })
};
//FUNCTION TO VIEW USER TABLES//
function viewDepartments() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        promptMenu();
    })
};

function viewRoles() {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        promptMenu();
    })
};

function viewEmployees() {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        promptMenu();
    })
};
//FUNCTION TO ADD NEW TABLE INFO//
function promptAddDepartment() {
    inquirer.prompt([{
        name: 'departmentName',
        message: 'Enter Name of Department'
    }])
        .then((answers) => {
            connection.query('INSERT INTO department SET ?', { name: answers.departmentName }, (err) => {
                if (err) throw err;
                console.log(`Department '${answers.departmentName}' added successfully`);
            })
            promptMenu();
        })
};

function promptAddRole() {
    inquirer.prompt([{
        name: 'roleName',
        message: 'Enter Name of Role'
    },
    {
        name: 'salary',
        message: 'Eneter Salary of Role'
    },
    {
        name: 'departmentId',
        message: 'Enter Department ID of Role'
    }
    ])
        .then((answers) => {
            connection.query('INSERT INTO role SET ?', {
                title: answers.roleName,
                salary: answers.salary,
                department_id: answers.departmentId
            },
                (err) => {
                    if (err) throw err;
                    console.log(`Role '${answers.roleName}' added successfully`);
                })
                promptMenu();
        })
};

function promptAddEmployee() {
    inquirer.prompt([
        {
            name: 'firstName',
            message: 'Enter Employees First Name'
        },
        {
            name: 'lastName',
            message: 'Enter Employees Last Name'
        },
        {
            name: 'roleId',
            message: 'Enter Employees role ID'
        },
        {
            name: 'managerId',
            message: 'Enter Employees Manager ID'
        }
    ])
        .then((answers) => {
            connection.query('INSERT INTO employee SET ?', {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: answers.roleId,
                manager_id: answers.managerId
            }),
                (err) => {
                    if (err) throw err;
                    console.log(`Employee '${answers.firstName}${answers.lastName}' added successfully`);
                }
                promptMenu();
        })
};
//FUNCTION TO UPDATE EMPLOYEE ROLE//
function promptUpdateEmployeeRole() {
    connection.query('SELECT * FROM employee', function (err, results) {
        if (err) {
            console.error('Error fetching employees:', err);
            return;
        }
        const employeeName = results.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }));
        // Prompt user to select employee of the legion
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Select the employee to update:',
                    choices: employeeName
                },
                {
                    type: 'input',
                    name: 'roleId',
                    message: 'Enter the new role ID for the employee:'
                }
            ])
            .then((answers) => {
                connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.roleId, answers.employeeId], (err) => {
                    if (err) throw err;
                    console.log(`Employee role updated successfully`);
                    promptMenu();
                })
            })
    })
};