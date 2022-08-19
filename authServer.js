
require('dotenv').config()
const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
const { token } = require('morgan')
app.use (express.json())

let refreshToken =[]

app.post('/token',(req,res)=>{
   const refreshToken = req.body.token
   if (refreshToken == null)return res.sendStatus(401)
   if(!refreshToken.includes(refreshToken))return res.sendStatus(403)
   jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRTET,(err,user)=>{
      if(err)return res.sendStatus(403)
      const accessToken=generateAccesstoken({name:user.name})
      res.json({accessToken:accessToken})
   })
})

app.delete('/delete',(req,res)=>{

refreshToken= refreshToken.filter(token=> token !==  req.body.token  )   
res.sendStatus(204)
})


app.post('/login',(req,res)=>{
    //authentication

    const username = req.body.username
    const user ={ name :username}

    const accessToken =  generateAccesstoken(user)
    const refreshToken = jwt.sign(user,
      process.env.REFRESH_TOKEN_SECRTET)

      refreshToken.push(refreshToken)

    res.json ({accessToken: accessToken,
      refreshToken:refreshToken})
})

function generateAccesstoken(user){
   return jwt.sign(user,process.env.ACCESSS_TOKEN_SECRET,{expiresIn:'40s'})
}


app.listen(4000)    