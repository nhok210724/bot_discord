//ENV import
require('dotenv').config();
//import http server
var http = require("http");
//import fs read file
var fs = require('fs');

const server = ()=>{
    http.createServer((req,res)=>{
        res.setHeader("Content-Type", "text/html");
        switch (req.url) {
            case "/riot.txt":
                res.writeHead(200);
                res.end(process.env.KEY_RIOT);
                break;
            default:
                res.writeHead(404);
                res.end("Not Found");
                break;
        }
        
        
    })
    .listen(5000,()=>{
        console.log("server is running");
    });
}

module.exports={
    server:server, 
}