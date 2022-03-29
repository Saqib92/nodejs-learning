const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.route('/getUserDetail')
    .get(userController.getUserByToken);

router.route('/getAllUsers')
    .get(userController.getAllUsers)
//.post(employeesController.createNewEmployee)

// router.route('/:id')
//     .get(employeesController.getEmployee);

module.exports = router;