// Node Server which will handle Socket io Connection
const io = require('socket.io')(8000)

const users={};

// io.on is an instance of "socket.io"  ----> This will handle new connections eg; User1 leaves, User2 joins

io.on('connection', socket =>{
// handles the functionality when a user-joined event is triggered
// ".on" listens to the event mentioned
    socket.on("new-user-joined", name=>{
        users[socket.id] =name;
        console.log(`New user ${name} joined `)
        // "user-joined" event will be broadcasted to the active connections
        socket.broadcast.emit('user-joined',name)
    })
    
    socket.on("send",(message) =>{
        // "user-joined" event will be broadcasted to the active connections
        socket.broadcast.emit('receive',{message: message , user: users[socket.id]})
    })

    socket.on('disconnect', () => {
        user=users[socket.id];
        socket.broadcast.emit('user-disconnected',user);
        delete users[socket.id];
      });
})
console.log(`Server is running on http://127.0.0.1:8000`)