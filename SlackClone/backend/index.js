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

    

    console.log(username, password)
    res.status(500).send("Logging In...")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
