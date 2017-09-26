socket.emit('message', "this is a test"); //chỉ gửi cho khách hàng người gửi
socket.broadcast.emit('message', "this is a test"); //gửi đến tất cả các khách hàng ngoại trừ người gửi
socket.broadcast.to('game').emit('message', 'nice game'); //gửi đến tất cả các khách hàng trong phòng 'trò chơi' (kênh) trừ người gửi
socket.to('game').emit('message', 'enjoy the game'); //gửi đến người gửi khách hàng, chỉ khi họ ở trong phòng 'trò chơi' (kênh)
socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //gửi đến socketid cá nhân
io.emit('message', "this is a test"); // gửi cho tất cả khách hàng, bao gồm người gửi
io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender
socket.emit(); //send to all connected clients
socket.broadcast.emit(); //send to all connected clients except the one that sent the message
socket.on(); //event listener, can be called on client to execute on server
io.sockets.socket(); //for emiting to specific clients
io.sockets.emit(); //send to all connected clients (same as socket.emit)
io.sockets.on() ; //initial connection from a client.