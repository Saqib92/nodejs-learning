const User = require('../model/User');

const getUserByToken = async (req, res) => {
    const cookies = req.headers.authorization.split(' ')[1];
    const Token = cookies;
    const foundUser = await User.find({ loginToken: Token }).exec();
    if (!foundUser) return res.status(401).json({ status: false, message: 'Unauthorized' }); //Unauthorized || User Not Found
    let myUser = {
        email: foundUser[0].email,
        fullName: foundUser[0].fullName,
        _id: foundUser[0]._id
    }
    res.json({ status: true, data: myUser });
}

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ message: 'No Users Found!' });
    let fUser = [];
    users.map((val) => {
        fUser.push({
            email: val.email,
            fullName: val.fullName,
            _id: val._id
        })
    })
    res.json({ status: true, data: fUser });
}

module.exports = {
    getUserByToken,
    getAllUsers
}

// const createNewEmployee = async (req, res) => {
//     if (!req?.body?.firstName || !req.body?.lastName) {
//         return res.status(400).json({ message: 'First and last name is requireq!' })
//     }
//     try {
//         const result = await Employee.create({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName
//         })
//         return res.json(result);
//     } catch (err) {
//         console.error(err)
//     }
// }

// const updateEmployee = async (req, res) => {
//     if (!req?.body?.id) {
//         return res.status(400).json({ message: 'ID Parameter Required' })
//     }

//     const employee = await Employee.findOne({ _id: req.body.id }).exec();

//     if (!employee) {
//         return res.status(204).json({ message: `No Employee Found with Id ${req.body.id}` })
//     }
//     if (req.body?.firstName) employee.firstName = req.body.firstName
//     if (req.body?.lastName) employee.lastName = req.body.lastName
//     const result = await employee.save();
//     res.json(result);

// }

// const deleteEmployee = async (req, res) => {
//     if (!req?.body?.id) {
//         return res.status(400).json({ message: 'ID Parameter Required' })
//     }
//     const employee = await Employee.findOne({ _id: req.body.id }).exec();
//     if (!employee) {
//         return res.status(204).json({ message: `No Employee Found with Id ${req.body.id}` })
//     }
//     const result = await employee.deleteOne({ _id: req.body.id });
//     res.json(result);
// }

// const getEmployee = async (req, res) => {
//     if (!req?.params?.id) {
//         return res.status(400).json({ message: 'ID Parameter Required' })
//     }
//     const employee = await Employee.findOne({ _id: req.params.id }).exec();
//     if (!employee) {
//         return res.status(204).json({ message: `No Employee Found with Id ${req.body.id}` })
//     }
//     res.json(employee);
// }

