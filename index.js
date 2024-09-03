const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/' && method === 'GET') {
        fs.readFile('./input.txt','utf-8',(error, data) => {
            if(data) {
                res.setHeader('Content-type','text/plain');
                res.statusCode =  200;
                res.write(data);
                res.end();
            } else {
                res.statusCode = 400;
                res.write(error);
                res.end();
            }
        })
    }
})

server.listen(3000)