const Server = require("ws").Server
const server = new Server({ port: 5001 })

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort(
  '/dev/cu.usbmodem141201',
  { baudRate: 9600 },
  err => {
    if (err) {
      console.log(err)
    }
  }
)
const parser = new Readline()
port.pipe(parser)

var dataBuffer = ''

parser.on('data', data => {
  dataBuffer = dataBuffer + ";" + data
})

console.log('WebSocket server listen on 5001')

server.on("connection", ws => {
  console.log('webSocket connected')

  parser.on('data', data => {
    ws.send(data)
  })
})

server.on("close", () => {
  console.log('Lost a client')
})
