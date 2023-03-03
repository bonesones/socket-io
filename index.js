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


io.on("connection",function(client) {
    console.log('New websocket connection');
    this.address = client.handshake.address
 client.on("new user", (username) => {
    this.address = client.handshake.address;
    client.username = username
    io.emit('messageFromServer', username + " присоединился к чату")
 })
 client.on('messageFromClient', msg => {
    const prefix = client.handshake.address === this.address ? client.username : "Вы"
    io.emit('messageFromServer', prefix + ": " + msg);
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
