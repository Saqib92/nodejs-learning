const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
};

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Username and Password are Required' });
    const foundUser = usersDB.users.find(person => person.email == email);
    if (!foundUser) return res.sendStatus(401); //Unauthorized

    // check password with bcrypt
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        res.json({ message: 'User Login Successfull', data: foundUser })
    }
    else {
        res.sendStatus(401);
    }
}


module.exports = { handleLogin };