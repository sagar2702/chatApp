var express = require("express");
const { static } = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var messageData = require('./public/formatData')
app.set("view engine","ejs" );
app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.render('index');
});

var users={};
//run when user connected
io.on('connection', (socket)=>{
    //new user connected tell everybody except the user connected
    socket.emit("chat message",messageData("SERVER", "Welcome to Apni Baat!!"));
    socket.on("newUser", (name)=>{
        users[socket.id]=name;
        io.emit("member", users);
        socket.broadcast.emit("newUser", messageData(users[socket.id], "joined the chat.."));
    })
    // console.log("a new user connected")
    //take msg from server
    socket.on('chat message', (msg)=>{
        //console.log("message: "+msg);
        //this below line is sending msg received from server to all user including sender 
        if(msg!==''){
            io.emit("chat message",  messageData(users[socket.id], msg) );
        }
     });
    //run when user disconnect
    socket.on('disconnect', () => {
        // console.log('user disconnected');
        io.emit("chat message",  messageData(users[socket.id], "left the chat..."));
        delete users[socket.id];
        io.emit("member", users);
    });

});

server.listen(3000, ()=>{
    console.log("server started! listening to port 3000");
})

