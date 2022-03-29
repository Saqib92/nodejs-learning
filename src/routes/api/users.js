const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.route('/')
    .get(userController.getUserByToken)
//.post(employeesController.createNewEmployee)

// router.route('/:id')
//     .get(employeesController.getEmployee);

module.exports = router;