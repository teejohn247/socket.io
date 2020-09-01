var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
// var server = app.listen(4000, function(){
//     console.log('listening for requests on port 4000,');
// });

    // var db = mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'node'
    // });

    // db.connect(func
    const port = process.env.PORT || 4000;
    // const debug = Debug('http');

    var server = app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
    
    // connectDb();
    
    
    // app.get('/api/v1', (req, res) => {
    //     res.json({
    //       message: 'Welcome to Dev-Connector API'
    //     });
    //   });
    
    // app.use('/api/v1', userRouter);
    // // Server static assets if in production
    // if (process.env.NODE_ENV === 'production') {
    //   // Set static folder
    //   app.use(express.static('public'))
    //   app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    //   });
    // }

app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        console.log(data);
        io.sockets.emit('chat', data);
        // db.query('INSERT INTO notes (note) VALUES (?)', data)
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
