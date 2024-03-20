import { io } from 'socket.io-client'
import * as readline from 'readline/promises';

let nickname = 'unknown';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    const asnwer = await rl.question('What is your nickname: ');
    nickname = asnwer.toString();
    
    const socket = io('ws://localhost:3000');

    socket.on("welcome", (data) =>{
        console.log(data.welcome);
        data.messages.forEach( (data: {nickname: string, message: string, date: Date}) => {
            console.log(`${data.nickname}: ${data.message}`)
        });
        rl.prompt();
    })


    socket.on("chat", (data) => {
        console.log(`${data.nickname}: ${data.message}`)
        rl.prompt();
    })

    rl.on('line', (input)=>{
        const payload = {
            nickname,
            message: input
        }
        socket.emit('chat', payload);
    })
}





main();