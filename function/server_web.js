//ENV import
require('dotenv').config();
//express sever
const express = require("express");
const app = express();
const PORT = 3000;

const server = ()=>{
    app.get("/riot.txt",(req,res)=>{
        res.render(process.env.KEY_RIOT);
    });
    app.listen(PORT || 3000,()=>console.log("App listen on PORT="+PORT));
}

module.exports={
    server:server, 
}