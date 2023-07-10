const mysql = require('mysql2');
const inquire = require('inquirer');

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


function promptMenu() {
    inquire.prompt({
        type: 'list',
        name: 'reference',
        message: 'Choose an option',
        choices: ['Departments', 'Roles', 'Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit']
    }
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
                case 'Add Dole':
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