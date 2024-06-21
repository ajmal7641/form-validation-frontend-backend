const express = require  ("express")
const route = express.Router()
const model = require('../models/model')



route.post('/register',async(req,res)=>{
      const worker = new model ({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
      })
  

      try {
            const dataSave = await worker.save()
            res.status(200).json(dataSave)
      } catch (error) {
        res.status(400).json({message : error.message})
            
      }
})


route.post('/login', (req,res)=>{
      // const worker = new model({
      //       email : req.body.email,
      //       password : req.body.password
      // })

      const {email, password} = req.body
      model.findOne({email:email})
            .then(user=>{
                if(user){
                  if(user.password === password) {
                        res.json("success")
                  }
                  else{
                        res.json("password incorrect")
                  }
            } else{
                  res.json("This record not exist")
            }
            })
})

module.exports = route