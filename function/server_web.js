//import http server
var http = require("http");
//import fs read file
var fs = require('fs');

const server = ()=>{
    http.createServer((req,res)=>{
        res.setHeader("Content-Type", "text/html");
        switch (req.url) {
            case "/riot.txt":
                try {
                    const contents = fs.readFileSync("db/riot.txt","utf-8");
                    res.writeHead(200);
                    res.end(contents);
                } catch (error) {
                    res.writeHead(500);
                    res.end(error);
                    return;
                }
                break;
            default:
                res.writeHead(404);
                res.end("Not Found");
                break;
        }
        
        
    })
    .listen(3000,()=>{
        console.log("server is running");
    });
}

module.exports={
    server:server, 
}