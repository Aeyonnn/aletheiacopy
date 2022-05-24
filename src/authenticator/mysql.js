const express =  require('express')
var mysql=require('mysql');

    const app = require();

 var db=mysql.createConnection({
    host: 'database-1.cyqaefb6grs6.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin123',
    database: 'Aletheia'
 });

app.post("/register", (req, res) => {
    db.query("INSERT INTO users (username,password), VALUE (?,?)", [username,password],
    (err, result) => {
        console.log(err);
    })
})
connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Connected!:)');
   }
 });
module.exports = connection;
