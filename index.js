const express = require("express")
var expressHbs = require('express-handlebars');
const hbs = require('hbs')
const router = require("./routes/index")
const app = express()
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer);
// const path = require("path");
app.use(express.json())
app.set('view engine', '.hbs');
const connectDB = require('./db')
app.use(express.static(__dirname + '/public'));
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// database connection functions
connectDB()

app.engine('.hbs', expressHbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.use('/', router)


const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    })

    socket.on('send', message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    })
    socket.on('disconnect', message =>{
        socket.broadcast.emit('leave', users[socket.id])
        delete users[socket.id]
    })
})


httpServer.listen(3000, () =>{
    console.log('http://localhost:3000');
})

