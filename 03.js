var net = require('net')

var socket = net.connect(9000, 'localhost')

socket.on('data', function (data) {
        process.stdout.write(data)
})

process.stdin.on('data', function(data) {
        socket.write(data)
})
