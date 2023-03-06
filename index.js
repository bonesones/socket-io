const express = require('express');
const path = require('path');
const http = require('http');


const app = express();
const server = http.Server(app);
const io = require('socket.io')(server)


app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.sendFile('/index.html')
})

const COLORS = ["#FF0000", "#043A6B", "#A66100", "#D636C9"]


const port = process.env.PORT || 3000;

const connections = [];


io.on("connection", function(client) {
    console.log('New websocket connection');
    client.on("new user", (username) => {
        connections.push(client.id)
        client.username = username
        client.color = COLORS[Math.floor(Math.random() * COLORS.length)]
        client.prefix = `<span style="color: ${client.color}">${username}</span>`
        io.emit('messageFromServer', `${client.prefix} присоединился к чату`)
        io.emit('counter', connections.length)
    })


    client.on('messageFromClient', msg => {
        io.emit('messageFromServer', client.prefix + ": " + msg);
    });

    client.on('type', (username) => {
        client.broadcast.emit('typing', username)
    })

   client.on('disconnect', () => {
        connections.splice(0, 1);
        io.emit('counter', connections.length)
        io.emit('messageFromServer', client.prefix + " отключился от сервера")
        console.log('New websocket disconnected');
  });
})

io.on("connection_error", (err) => {
    console.log(err);
});

server.listen(port,()=>{
    console.log(`Server is up on port ${port}!`);
})
