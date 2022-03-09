const mysql= require ('mysql');
const mysqlConnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodejs-login-jwt'
});

mysqlConnection.connect(err=>{
 if (err){
     console.log('error en db: ', err);
     return;
 }
 else{
     console.log('Connection db ok');
 }
});
module.exports=mysqlConnection;