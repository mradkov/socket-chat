var net = require('net')
var streamSet = require('stream-set')

var streams = streamSet()
var server = net.createServer(function (socket) {
        console.log('A client connected!')
        streams.forEach(function (otherSocket) {
                otherSocket.on('data', function(data) {
                        socket.write(data)
                })
                socket.on('data', function(data) {
                        otherSocket.write(data)
                })
        })
        streams.add(socket)
})

server.listen(9000)
