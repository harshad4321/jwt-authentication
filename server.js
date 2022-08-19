const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
app.use (express.json())


const posts = [
   {
    username:'kyle',
    title:'post 1'
   },
   {
    username:'jim',
    title:'post 2'
   }
]

app.post ('/post ',(req, res)=>{
res.json(posts)

}) 
app.post('/login',(req,res)=>{
    //authentication

    const username = req.body.username
const user ={ name :username}


   const accessToken=  jwt.sign(user, process.env.ACCESSS_TOKEN_SECRET)
     res.json ({accessToken:accessToken})
})


app.listen(3000)