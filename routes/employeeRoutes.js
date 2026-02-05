const express = require('express');
const router = express.Router();
const Employee = require("../models/Employee");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get('/index', async (req, res) => {
  const employees = await Employee.find();
  res.render('index', { title: "HR Doc", employees });
});


router.get('/registration', (req, res) => {
  res.render('registration', { title: "Employee Registration", employee: null });
});


router.post('/add', async (req, res) => {
  const { name, designation, location, salary } = req.body;

  await Employee.create({
    name,
    designation,
    location,
    salary
  });

  res.redirect('/index');
});


router.post('/remove/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.redirect('/index');
});


router.get('/edit/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.render('registration', {
    title: "Edit Employee",
    employee
  });
});


router.post('/edit/:id', async (req, res) => {
  const { name, designation, location, salary } = req.body;

  await Employee.findByIdAndUpdate(req.params.id, {
    name,
    designation,
    location,
    salary
  });

  res.redirect('/index');
});

module.exports = router;
