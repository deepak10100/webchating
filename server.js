const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path')
const port = process.env.PORT || 3000
app.use('/public', express.static(path.join(__dirname, 'public')))

 const users={};


 
 io.on('connection', (socket) => {
     socket.on('new-user-joined', (username) => {
        users[socket.id]= username
        socket.broadcast.emit("user-connected",username)
        io.emit("user-list",users)
      });

      socket.on('disconnect', () => {
        // console.log('user disconnected');
        socket.broadcast.emit("user-disconnect", users[socket.id])
        delete users[socket.id]
        io.emit("user-list",users)
      });

      socket.on('message',function (data) {
          socket.broadcast.emit("message", data)
      })
    
    });
    
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/chetui.html');
    });
server.listen(port, () => {
  console.log(`chat website listen on ${port}`);
});