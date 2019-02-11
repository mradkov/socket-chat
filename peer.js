var topology = require('fully-connected-topology')
var jsonStream = require('duplex-json-stream')
var streamSet = require('stream-set')

var me = process.argv[2]
var peers = process.argv.slice(3)

var swarm = topology(me, peers)
var streams = streamSet() 

swarm.on('connection', function (peer) {
        console.log('[a peer joined]')
        peer = jsonStream(peer)
        streams.add(peer)
        peer.on('data', function (data) {
                console.log(data.username + '> ' + data.message)
        })
})

process.stdin.on('data', function(data) {
        streams.forEach(function (peer) {
                peer.write({
                        username: me,
                        message: data.toString().trim()
                })
        })
})
