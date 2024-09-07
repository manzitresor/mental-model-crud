const http = require('http');
const fs = require('fs');
const { swaggerUi, swaggerDocs } = require('./swagger');
const express = require('express');

const app = express();

app.use('/api/docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    /**
     * @swagger
     * /:
     *  get:
     *     summary: Get content of input.txt file
     *     response:
     *      200:
     *          description: Returns the contents of the file
     *          content:
     *              text/plain:
     *                  schema:
     *                      type: string
     *      400: 
     *          description: File not Found
     */

    if(url === '/' && method === 'GET') {
        const readStream = fs.createReadStream('./input.txt',{ encoding: 'utf-8' });

        readStream.on('error',(error) => {
            res.statusCode = 404;
            res.write(error);
            res.end();
        })

        res.setHeader('Content-type','text/plain');
        res.statusCode =  200;
        readStream.pipe(res)
    }
    
    /**
   * @swagger
   * /:
   *   post:
   *     summary: Write data to input.txt file
   *     requestBody:
   *       required: true
   *       content:
   *         text/plain:
   *           schema:
   *             type: string
   *     responses:
   *       200:
   *         description: Data sent successfully
   *       404:
   *         description: Failed to send data
   */

    if(url === '/' && method === 'POST'){
        const writeStream = fs.createWriteStream('./input.txt', { encoding: 'utf-8' });

        req.on('data',(chunk) => {
            writeStream.write(chunk)
        })

        req.on('end',() => {
                writeStream.end()

                    writeStream.on('finish',()=> {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/plain');
                        res.write('Data sent successfully');
                        res.end();
                    })

                    writeStream.on('error',()=> {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'text/plain');
                        res.write('Failed to send Data');
                        res.end();
                    })
            })
    }
})

const port = process.env.PORT || 3000
server.listen(port,() => console.log(`Running on port ${port}`))
app.listen(3001,()=> console.log('Swagger running on Port 3001'))