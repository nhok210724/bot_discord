//ENV import
require('dotenv').config();
//express sever
const express = require("express");
const app = express();
const PORT = 3000;

const server = ()=>{
    app.get("/riot.txt",(req,res)=>{
        res.send(process.env.KEY_RIOT);
    });
    app.listen(PORT,()=>console.log("App listen on PORT="+PORT));
}

module.exports={
    server:server, 
}