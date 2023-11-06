const express = require('express')
const app = express();
const Cors = require('cors')
const cookieParser = require('cookie-parser');
const expressfileupload = require('express-fileupload');
require('dotenv').config()
const { IO } = require('../controllers/chatController')
// SOCKECT.IO IMPORT
// const server = require('http').createServer();
// const io = require('socket.io')(server);
const http = require('http');
const socketIO = require('socket.io');
const { createSocket, Socket } = require('dgram');
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT | 5000;

app.use(Cors()); 
app.use(cookieParser());
app.use(expressfileupload());
app.use(express.json());
app.use(express.static('/imageUpload', express.static(__dirname + '/public')));
app.use(express.urlencoded({ extended: false }))
app.use('/mainProduct', require('../routers/Product'));
app.use('/client', require('../routers/user'));
app.use('/dashboard', require('../routers/dashboard'));
app.use('/tempUpload', require('../routers/templates'));
app.use('/setting', require('../routers/settings'));
app.use('/plan', require('../routers/plans'));
app.use('/collaboration', require('../routers/collaborators'));
app.use('/converter', require('../routers/convert'));
app.use('/workSaves', require('../routers/workSaves'))
app.use('/chat', require('../routers/chats'));
app.use('/save', require('../routers/workSaves'));


let clients = []
IO(io)

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port  http://localhost:${PORT}`);
});
