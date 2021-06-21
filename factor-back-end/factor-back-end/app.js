const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/index');
const app = express();

// Route /api to Routes directory
app.use('/', routes);

app.use(cors())

app.listen(5000, () => {
    console.log('Listening on port 5000!')
});