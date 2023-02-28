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




const port = process.env.PORT || 3000;


io.on("connection",(client)=>{
    console.log('New websocket connection');
 client.on("new user", (username) => {
    client.username = username
    io.emit('messageFromServer', username + " присоединился к серверу")
 })
 client.on('messageFromClient', msg => {
    io.emit('messageFromServer', client.username + ": " + msg);
  });

   client.on('disconnect', () => {
    io.emit('messageFromServer', client.username + " отключился от сервера")
    console.log('New websocket disconnected');
  });
})

io.on("connection_error", (err) => {
    console.log(err);
});

server.listen(port,()=>{
    console.log(`Server is up on port ${port}!`);
})
