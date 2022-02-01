//For Dummy Data
const data = {};
data.employees = require('../model/employees.json');


const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    });
}

const updateEmployee = (req, res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    });
}

const deleteEmployee = (req, res) => {
    res.json({
        "id": req.body.id
    })
}

const getEmployee = (req, res) => {
    const employee = data.employees.find(em=> em.id === parseInt(req.params.id));
    if(!employee){
        return res.status(404).json({message: `Employee ID ${req.params.id} not found`});
    }
    res.json({ "data": employee });
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}