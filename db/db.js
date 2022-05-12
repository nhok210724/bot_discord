require('dotenv').config();
var mysql = require("mysql");

var connect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

const connect_db = async () =>{ connect.connect((error)=>{
if(error) {console.log(error); return;}
console.log('Connected');
})};

module.exports = {
    connect_db: connect_db,
};