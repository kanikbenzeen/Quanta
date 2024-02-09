const express = require("express")
var expressHbs = require('express-handlebars');
const index = require("./routes/index")
const forms = require("./routes/forms")

const app = express()
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer);
const session = require('express-session')
const {socketController} = require('./controllers/message.controller')
app.use(express.json())
app.set('view engine', '.hbs');
const connectDB = require('./db')
app.use(express.static(__dirname + '/public'));
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// database connection functions
connectDB()
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }))

  app.engine('.hbs', expressHbs.engine({ extname: '.hbs', defaultLayout: "main", helpers:{
    json: function (context) { return JSON.stringify(context); },
    xIf: function(v1, operator, v2, options) {
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '!==':
                return (v1 !== v2) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    },
    trim: function(value, options) {
        return value.split(" ")
        .map(word => word[0].toUpperCase())
        .join("");
        // return m.format(formatToUse);
    },

    isSelectedUser: function(currentUserId, selectedUserId) {
        // Compare the currentUserId with the selectedUserId
        return currentUserId === selectedUserId;
    }
}}));


app.use('/', index)
app.use('/form', forms)

socketController(io)



httpServer.listen(3000, () =>{
    console.log('http://localhost:3000');
})

