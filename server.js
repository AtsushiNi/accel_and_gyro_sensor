const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
}

const server = http.createServer((req, res) => {
  var filePath = ''

  if (req.url == '/') {
    filePath = __dirname + '/index.html'
  } else {
    filePath = __dirname + req.url
  }

  res.writeHead(200, {'Content-Type': mime[path.extname(filePath)] || "text/plain"})
  fs.readFile(filePath, function(err, data) {
    if (err && filePath != __dirname + '/favicon.ico') {
      console.log('-------------web server error------------')
      console.log(err)
    } else {
      res.end(data, 'UTF-8')
    }
  })
})

const port = 8000
server.listen(port)
console.log('Server listen on port' + port)
