require('dotenv').config();
var mysql = require("mysql");

var connect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

const connect_db = async () =>{ 
    var sql = "CREATE TABLE users (uuid VARCHAR(50),name NVARCHAR(100),tagline varchar(10))";
    connect.query(sql,(e)=>{
        if(e) console.log(e);
        console.log("Table users created");
    });
};

/**
 * Insert user to DB
 * @param {string} uuid user id discord
 * @param {string} name name in valorant
 * @param {string} tagline tag id in valorant
 * @returns true | false
 */
const insertUser = async (uuid='',name='',tagline='') =>{
    if (!uuid) return false;
    if (!name) return false;
    if (!tagline) return false;
    
    var sql = `INSERT INTO users (uuid,name,tagline) VALUES ('${uuid}','${name}','${tagline}')`;
    return new Promise((resolve,reject)=>{
        connect.query(sql,e=>{
            if(e) {console.log(e); return reject(false);}
            console.log("Insert users success !");
            return resolve(true);
        });
    }).catch(e=>{console.log(e); return false;});
}

/**
 * get info user in DB
 * @param {string} uuid 
 */
const getInfoUser = async (uuid='')=>{
    if (!uuid) {
        return null;
    }
    var sql = `SELECT name,tagline FROM users where uuid = '${uuid}'`;
    return new Promise((resolve, reject)=>{
        connect.query(sql,(e,result)=>{
            if(e){console.log(e);return reject(null);}
            console.log("Get Data Success !");
            return result.length > 0 ? resolve(result[0]) : resolve(null);
        });
    }).catch(e=>{console.log(e);return false;});
    
}

/**
 * Update info user in DB
 * @param {string} uuid uuid in discord
 * @param {string} name name in valorant
 * @param {string} tagline tag id in valorant
 */
const updateInfoUser = async (uuid='',name='',tagline='') =>{
    if (!uuid) return false;
    if (!name) return false;
    if (!tagline) return false;

    var sql = `update users set name = '${name}', tagline = '${tagline}' where uuid = '${uuid}'`;
    return new Promise((resolve,reject)=>{
        connect.query(sql,e=>{
            if(e) {console.log(e); return reject(false);}
            console.log("Update users success !");
            return resolve(true);
        });
    }).catch(e=>{console.log(e);return false;});
}

const truncate = () => {
    var sql = "TRUNCATE TABLE users";
    connect.query(sql,(e)=>{
       if(e){ console.log(e); return;}
        console.log("Truncate Table Users !!");
    });
}
module.exports = {
    insertUser: insertUser,
    getInfoUser: getInfoUser,
    updateInfoUser: updateInfoUser,
    truncate: truncate,
};