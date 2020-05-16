const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' })
  res.write('<h1>Hello World</h1>')
})

const port = 8000
server.listen(port)
console.log('Server listen on port' + port)
