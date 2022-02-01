const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
};

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handelNewUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    if (!email || !password) return res.status(400).json({ 'message': 'Username and Password are Required' });
    //check for duplicate username
    const duplicate = usersDB.users.find(person => person.email === email);
    if (duplicate) return res.sendStatus(409);
    try {
        //password encrypt
        const hashPassword = await bcrypt.hash(password, 10);

        //store new user
        const newUser = { email: email, password: hashPassword };
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({ 'message': 'user created successfully' });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

module.exports = { handelNewUser }