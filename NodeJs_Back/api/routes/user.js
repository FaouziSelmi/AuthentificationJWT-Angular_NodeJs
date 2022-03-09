const express=require('express');
const router= express.Router();

const mysqlConnection= require('../connection/connection');

const jwt=require('jsonwebtoken');

router.get('/', (req,res) =>{
    mysqlConnection.query('select * from users', (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});
 router.post('/singin', (req,res)=>{
    // console.log(req.body);
    const{userName, password}=req.body;
    mysqlConnection.query('select * from users where userName=? and password=?',
     [userName,password], (err,rows,fields)=>{
         if(!err){
             //console.log(rows);
             if(rows.length >0){
              let data=JSON.stringify(rows[0]);
             const token= jwt.sign(data,'faouziselmi');
              res.json({token});
             }else{
                 res.json('userName ou bien password incorrect');
             }
         }else{
             console.log(err);
         }
     })
     
 })
 router.post('/test',verifyToken,(req,res)=>{
    console.log(req.data);
     res.json('Information secrete');
 })

 function verifyToken(req,res,next){
     if(!req.headers.authorization) return res.status(401).json('accès non autorisé');
     const token=req.headers.authorization.substr(7);
     //console.log(token);
     if (token !==''){
        const content= jwt.verify(token,'faouziselmi');
        //console.log(content);

        req.data=content;// a voir
        next();
     }else{
        res.status(404).json({msg: "Auth Failed"});
        
     }
 }
module.exports=router;