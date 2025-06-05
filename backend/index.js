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



let posts = [
    {
        username: "Jim",
        title: "post1"
    },
    {
        username: "Joe",
        title: "post2"
    }
]

let refreshTokens  = []
const REFRESH_TIME = '25s'

app.get('/token', (req, res) => {
    const refreshToken = req.body.token;
    if (refreshTokens == null)
        return res.status(401).send("No token provided");

    if (refreshTokens.indexOf(refreshToken) === -1)
        return res.status(403).send("Invalid refresh token");

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).send(err);

        const accessToken = jwt.sign( { name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: REFRESH_TIME});
        res.status(200).send(JSON.stringify({
            accessToken: accessToken,
        }));
    })


})

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
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: REFRESH_TIME});
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
            refreshTokens.push(refreshToken);
            return res.status(200).send(JSON.stringify( {
                accessToken: accessToken,
                refreshToken: refreshToken
            }));
        }
        else
            return res.status(404).send();

    } catch (e) {
        return res.status(500).send();
    }
})

app.delete('/api/logout', async (req, res) => {
    refreshTokens = refreshTokens.filter( token => token !== req.body.token)
    res.status(204).send("Successfully logged out!");


})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
