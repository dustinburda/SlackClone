require('dotenv').config()

const express = require('express');
const cors = require("cors")
const bycrypt = require("bcrypt")

const app = express();
app.use(express.static('../frontend'))
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000;

const credentials = {
};

app.get('/', (req, res) => {
    res.set({
        "content-type": "text/plain"
    });
    res.send("<h1> Hello World! </h1>");
})

app.post('/api/signup/', async (req, res) => {
    const {username, password} = req.body;

    try {
        const salt = await bycrypt.genSalt();
        const hashedPassword = await bycrypt.hash(password, salt);

        credentials[username] = hashedPassword;
        res.status(201).send();

    } catch (e) {
        res.status(500).send();
    }
})

app.post('/api/login/', async (req, res) => {
    
    const {username, password} = req.body;

    try {
        if (!(username in credentials))
            res.status(404).send();

        validPassword = await bycrypt.compare(password, credentials[username]);

        if (validPassword)
            res.status(200).send();
        else
            res.status(404).send();

    } catch (e) {
        res.status(500).send();
    }
})



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
