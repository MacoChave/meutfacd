const { Server } = require('socket.io');

const io = new Server({ cors: '' });

io.on('connection', (socket) => {
	console.log(socket.id, 'connected');
});

io.listen(3000);
