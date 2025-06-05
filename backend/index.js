require('dotenv').config({
    path: "./process.env"
})

const express = require('express');
const cors = require("cors")
const bycrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const { authenticateToken} = require("./auth.js");

const app = express();
app.use(express.static('../frontend'))
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT;

const credentials = {
};



posts = [
    {
        username: "Jim",
        title: "post1"
    },
    {
        username: "Joe",
        title: "post2"
    }
]

app.get('/posts', authenticateToken, (req, res) => {
    res.set({
        'Content-Type': 'application/json',
    })
    console.log(req.user.name);
    return res.send(JSON.stringify(posts.filter( post => post.username === req.user.name )))
})


app.get('/', (req, res) => {
    res.set({
        "content-type": "text/plain"
    });
    return res.send("<h1> Hello World! </h1>");
})

app.post('/api/signup/', async (req, res) => {
    const {username, password} = req.body;

    if (credentials.hasOwnProperty(username))
        return res.status(400).send("Username already exists!");

    try {
        const salt = await bycrypt.genSalt();
        const hashedPassword = await bycrypt.hash(password, salt);

        credentials[username] = hashedPassword;
        return res.status(201).send("Successfully signed up!");

    } catch (e) {
        return res.status(500).send("Failed to sign up!");
    }
})

app.post('/api/login/', async (req, res) => {
    console.log("Logging in...")
    const {username, password} = req.body;

    try {
        if (!(username in credentials))
            return res.status(404).send();

        validPassword = await bycrypt.compare(password, credentials[username]);

        if (validPassword) {
            const user = { name: username };
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            return res.status(200).send(JSON.stringify(accessToken));
        }
        else
            return res.status(404).send();

    } catch (e) {
        return res.status(500).send();
    }
})

app.post('/api/logout', async (req, res) => {
    const {username} = req.body;

    
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
