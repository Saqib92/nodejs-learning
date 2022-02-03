const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
};

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');
require('dotenv').config();

const handleLogin = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Username and Password are Required' });
    const foundUser = usersDB.users.find(person => person.email == email);
    if (!foundUser) return res.sendStatus(401); //Unauthorized || User Not Found
    console.log(foundUser);
    // check password with bcrypt
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        //create JWTs
        const accessToken = jwt.sign(
            { 'email': foundUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { 'email': foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        const otherUsers = usersDB.users.filter(person => person.email != foundUser.email);
        const currentUser = { ...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        res.json({ accessToken });
    }
    else {
        res.sendStatus(401);
    }
}


module.exports = { handleLogin };