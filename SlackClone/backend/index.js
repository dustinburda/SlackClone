require('dotenv').config()

const express = require('express');
const cors = require("cors")

const app = express();
app.use(express.static('../frontend'))
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000;

const credentials = {
    "dustin": "1234"
};

app.get('/', (req, res) => {
    res.set({
        "content-type": "text/plain"
    });
    res.send("<h1> Hello World! </h1>");
})

app.post('/api/login/', (req, res) => {
    
    const {username, password} = req.body;

    if (username in credentials && credentials[username] == password) 
        res.status(200).send("Successfully logged in!");
    else 
        res.status(404).send("Failed to log in!")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
