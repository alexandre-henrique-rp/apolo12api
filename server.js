const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config()

app.use(cors());
app.use(express.json());

let totem = require('./totem');
app.use(totem);

const port = 3009;

app.listen(port, () => {
    console.log(`🚀🚀  Servido em execução na porta: ${port}! 🚀🚀 ` )
});