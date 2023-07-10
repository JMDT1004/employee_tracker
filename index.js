const mysql = require('mysql2');
const inquirer = require('inquirer');

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

function viewDepartments() {
    connection.query('SELECT * FROM department', (err,res) => {
        if (err) throw err;
        console.log(res);
    })
};
function viewRoles() {
    connection.query('SELECT * FROM role', (err,res) => {
        if (err) throw err;
        console.log(res);
    })
};function viewEmployees() {
    connection.query('SELECT * FROM employee', (err,res) => {
        if (err) throw err;
        console.log(res);
    })
};
function promptAddDepartment(){
    inquirer.prompt([{
        name:'departmentName',
        message: 'Enter Name of Department'
    }])
    .then((answers) => {
        connection.query('INSERT INTO department SET ?', {name: answers.departmentName}, (err) => {
            if (err) throw err;
            console.log()
        })
    })
}


