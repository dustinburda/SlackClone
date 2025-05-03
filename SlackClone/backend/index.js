require('dotenv').config()

const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('../frontend'))

app.get('/', (req, res) => {
    res.set({
        "content-type": "text/plain"
    });
    res.send("<h1> Hello World! </h1>");
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
