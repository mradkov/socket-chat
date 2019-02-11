var topology = require('fully-connected-topology')
var jsonStream = require('duplex-json-stream')
var streamSet = require('stream-set')
var register = require('register-multicast-dns')
var toPort = require('hash-to-port')

var me = process.argv[2]
var peers = process.argv.slice(3)

var swarm = topology(toAddress(me), peers.map(toAddress))
var streams = streamSet() 

register(me)

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

function toAddress (name) {
        return name + '.local:' + toPort(name)
}
