

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mysql = require('mysql');
// init connect db mysql
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1411',
    database: 'myplace'
});

// connect my sql db
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('db connected as id ' + connection.threadId);
});


// run server on port 8080
http.listen(process.env.PORT || 8080, function () {
    console.log('server listening on *:8080')
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('user connection: ' + socket.id);

    io.emit('emit_user_connected', { full_name: '' });

    socket.on('disconnect', function () {
        console.log('user disconnect: ' + socket.id);
        socket.broadcast.emit('emit_user_disconnect', { socket_id: socket.id });
    });

    socket.on('on_message', function (msg) {
        console.log(msg['user_name']);
        //console.log(msg['id'] + '\nlat: ' + msg['lat'] + ', lng: ' + msg['lng'] + '\n' + msg['address']);
        connection.query("SELECT * FROM users WHERE user_name = '" + msg['user_name'] + "' LIMIT 1", function (err, result, fields) {
            if (err) throw err;
            //console.log(result.length);
            if (result.length < 1) return null;
            //console.log(result[0].full_name + ', ' + result[0].gender + ', ' + result[0].age);
            socket.broadcast.emit('emit_message', { socket_id: socket.id, full_name: result[0].full_name, gender: result[0].gender, age: result[0].age, lat: msg['lat'], lng: msg['lng'], address: msg['address'] });
        });
    });
});

