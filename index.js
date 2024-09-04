const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/' && method === 'GET') {
        const readStream = fs.createReadStream('./input.txt','utf-8');

        readStream.on('error',(error) => {
            res.statusCode = 404;
            res.write(error);
            res.end();
        })

        res.setHeader('Content-type','text/plain');
        res.statusCode =  200;
        readStream.pipe(res)
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data',(chunk) => {
            body.push(chunk)
        })

        req.on('end',() => {
            const message = Buffer.concat(body).toString();
            fs.writeFile('./input.txt',message,() => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.write('Data sent successfully');
                res.end();
            })
        })
    }
})

server.listen(3000)