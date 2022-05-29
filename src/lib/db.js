const mysql=require('mysql');
const express = require('express')

const app = express();

const connection=mysql.createConnection({
    host: 'database-1.cyqaefb6grs6.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin123',
    database: 'Aletheia'
 });
connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Connected!:)');
   }
 });  

 app.get('/', function(req,res){
    res.
 });

 app.listen(4500);