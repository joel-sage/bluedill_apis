const express = require('express')
const app = express();
const Cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT | 5000;

app.use(Cors());
app.use(express.json());
app.use('/mainProduct', require('../routers/Product'));
app.use('/client', require('../routers/user'));
app.use('/dashboard', require('../routers/dashboard'));
app.use('/tempUpload', require('../routers/templates'));
app.use('/setting', require('../routers/settings'));
app.use('/plan', require('../routers/plans'))
app.use('/collaboration', require('../routers/collaborators'))
app.listen(PORT, () => {
    console.log(`app is runing on port localhost:${PORT}`);
}) 