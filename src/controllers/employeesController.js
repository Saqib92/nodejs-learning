const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees) return res.status(204).json({ message: 'No Employee Found!' });
    res.json(employees);
}

const createNewEmployee = async (req, res) => {
    if (!req?.body?.firstName || !req.body?.lastName) {
        return res.status(400).json({ message: 'First and last name is requireq!' })
    }
    try {
        const result = await Employee.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
        return res.json(result);
    } catch (err) {
        console.error(err)
    }
}

const updateEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ message: 'ID Parameter Required' })
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();

    if (!employee) {
        return res.status(204).json({ message: `No Employee Found with Id ${req.body.id}` })
    }
    if (req.body?.firstName) employee.firstName = req.body.firstName
    if (req.body?.lastName) employee.lastName = req.body.lastName
    const result = await employee.save();
    res.json(result);

}

const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ message: 'ID Parameter Required' })
    }
    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ message: `No Employee Found with Id ${req.body.id}` })
    }
    const result = await employee.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getEmployee = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ message: 'ID Parameter Required' })
    }
    const employee = await Employee.findOne({ _id: req.params.id }).exec();
    if (!employee) {
        return res.status(204).json({ message: `No Employee Found with Id ${req.body.id}` })
    }
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}