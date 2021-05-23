const db =  require('../config/connexion')
const express = require("express");
const jwt = require("jsonwebtoken")
const app = express();
app.use(express.json({ extended: false }));

//signup route api
exports.signupUser = async (req, res) => {

    const { email, password } = req.body;
   
    const sqlVerify = "SELECT * FROM users WHERE email=?"
    const sql = "INSERT INTO users(email,password) VALUES(?,?)"
  
    db.query(sqlVerify,email,(err,rows)=>{
      if(err){
        return res.json('Insert failed!')
      }
      if(rows.length >0){
        res.json({message:"Email already taken"})
      }
      else{
        db.query(sql,[email,password],(err,result)=>{
          if(err){
            return res.json(err)
          }
         var token = jwt.sign({email:2},"password")
        return res.json({ token:token});  
        })
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

exports.privateRoute = async (req, res) => {

let token = req.header("token")

if(!token) {
  res.json({msg: "sorry this is a private route"})
}
var decoded = jwt.verify(token, "password")
console.log(decoded.id)
//return res.json({msg:"you are in the private route"})

//get user infos by his token
const sql = "SELECT * FROM users WHERE id=?"
db.query(sql,decoded.id,(err,rows)=>{
  return res.json({
    id:decoded.id,
    email:rows[0].email, 
    password:rows[0].password
  })
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

exports.login = async (req, res) => {

  const { email, password } = req.body;
  
  const sql = "SELECT * FROM users WHERE email=?"

    db.query(sql,email,(err,rows)=>{

      if(err){
        res.send('Login failed!')
      }
      if(rows.length>0){
        if(rows[0].password == password){
          console.log(rows[0])
          var token = jwt.sign({id:rows[0].id},"password")

          return res.json({
            email:email,
            password:password,
            token:token
          });

        }
        else{
          return res.json({message:"password is not correct"})
        } 
      }
      else{
        return res.json({message : "no user found with that email"})
      }
    })

};

