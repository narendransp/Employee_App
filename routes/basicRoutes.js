const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

let employees = [
    { id: 5, name: "Akhil", designation: "Data Analyst", location: "Ernakulam", salary: 90000 },
    { id: 6, name: "Aparna", designation: "Frontend Developer", location: "Thrissur", salary: 80000 },
    { id: 7, name: "Adithya", designation: "Backend Developer", location: "Calicut", salary: 100000 },
    { id: 8, name: "Anjali", designation: "QA Engineer", location: "Palakkad", salary: 75000 },
    { id: 9, name: "Aravind", designation: "DevOps Engineer", location: "Kannur", salary: 110000 }
];


router.get('/index', (req, res) => {
        res.render('index', {
            title: "HR Doc",
            employees
        });
    });


router.get('/registration', (req, res) => {
        res.render('registration', {
            title: "Employee Registration",
            employee: null 
        });
    });

router.post('/add', (req, res) => {
        const { name, designation, location, salary } = req.body;

        if (!name || !designation || !location || !salary) {
            return res.status(400).send("All fields are required.");
        }

        const newEmployee = {
            id: employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1,
            name,
            designation,
            location,
            salary: parseFloat(salary)
        };

        employees.push(newEmployee);
        res.redirect('/index');
    });


router.post('/remove/:id', (req, res) => {
        const id = Number(req.params.id);
        const index = employees.findIndex(emp => emp.id === id);
        
        if (index === -1) {
            return res.status(404).send('Employee not found');
        }
        
        employees.splice(index, 1);
        res.redirect('/index');
    });



router.get('/edit/:id', (req, res) => {
        const id = Number(req.params.id);
        const index = employees.findIndex(emp => emp.id === id);
        
        if (index === -1) {
            return res.status(404).send({ error: 'Employee not found' });
        }
        res.render('registration', {
            title: 'Edit Employee',
            employee: employees[index]
        });
    });

router.post('/edit/:id', (req, res) => {
        const id = Number(req.params.id);
        const { name, designation, location, salary } = req.body;
        const index = employees.findIndex(emp => emp.id === id);
        
        if (index === -1) {
            return res.status(404).send('Employee not found');
        }
        
        employees[index].name = name;
        employees[index].designation = designation;
        employees[index].location = location;
        employees[index].salary = Number(salary);
        
        res.redirect('/index');
    });


module.exports = router;