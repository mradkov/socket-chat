var net = require('net')

var server = net.createServer(function (socket) {
        console.log('A client connected!')
        socket.on('data', function (data) {
                socket.write(data)
        })
})

server.listen(9000)
