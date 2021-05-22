const db =  require('../config/connexion')
const express = require("express");
const app = express();
app.use(express.json({ extended: false }));

//signup route api
exports.signupUser = async (req, res) => {

    const { email, password } = req.body;
    console.log(email);
    console.log(password);
  
    const sql = "INSERT INTO users(email,password) VALUES(?,?)"
  
    db.query(sql,[email, password],(err,rows)=>{
      if(err){
        res.send('Insert failed!')
      }
      else{
        //res.send(`${email} Insert successfully!`)
        res.json({ token:"1234567890"});
       //res.status(201).send({message : 'registrations compelete'})
        
      }
    })
    
};

exports.deleteUser = async (req, res) => {

  //const {email} = req.body
  const sql = "DELETE FROM users"

  db.query(sql,(err,rows)=>{
    if(err){
      console.log(err)
    }
    else{
      
      //res.send(`${req.body.email} delete succefully!`);
    }
  })
  
};

exports.fetchUsers = async (req, res) => {

  const sql = "SELECT * FROM users"

  db.query(sql,(err,rows)=>{
    if(err){
      console.log(err)
    }
    else{
      //res.send(`${email} Insert successfully!`)
      //res.json();
      res.send(rows);
    }
  })
  
};

