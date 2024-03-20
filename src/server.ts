import { Server } from 'socket.io'

const PORT = 3000
const io = new Server(PORT);
console.log("Server listening on port: ", PORT);

const messages: {nickname: string, message:string, date: Date}[] = [];

io.on('connection', (socket) => {
    console.log("New socket ID connection", socket.id);
    const welcome = {
        welcome: 'Welcome to global-chat!',
        messages
    }
    socket.emit('welcome', welcome);

    // Add socket in room
    socket.join('global-chat');

    // Listener to "chat" event
    socket.on('chat', (data) => {
        data.date = new Date();
        console.log(data);
        messages.push(data);
        // Send 'data' to all joined sockets in room 'chat'
        io.in('global-chat').emit('chat', data);
    })
})








