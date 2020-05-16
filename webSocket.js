const Server = require("ws").Server
const server = new Server({ port: 5001 })

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort(
  '/dev/cu.usbmodem141201',
  { baudRate: 9600 },
  err => console.log(err)
)
const parser = new Readline()
port.pipe(parser)

var dataBuffer = ''

parser.on('data', data => {
  dataBuffer = dataBuffer + ";" + data
})

server.on("connection", ws => {
  setInterval(() => {
    console.log(dataBuffer)
    ws.send(dataBuffer)
    dataBuffer = ''
  }, 1000)
})

server.on("close", () => {
  console.log('Lost a client')
})
