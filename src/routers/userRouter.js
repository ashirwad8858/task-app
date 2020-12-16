const express = require('express')
const router = new express.Router()
const User = require('../models/users')

router.post('/users', async (req,res)=>{
    console.log(req.body)
    try{
        const user = new User(req.body)
        await user.save()
        const token = user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send()
    }
    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })

    
})

router.post('/users/login', async (req,res)=>{
    try{
        
        const user =await User.findByCredentials(req.body.email, req.body.password)
        const token =await user.generateAuthToken()

        // console.log(user)
        res.send({user,token})
    }catch(e){
        res.status(400).send()
    }
})

router.get('/users',async (req,res)=>{
    try{
        const user = await User.find({})
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
    
    // User.find({}).then((user)=>{
    //     res.send(user)
    // }).catch((er)=>{
    //     res.status(500).send()
    // })
})


router.get('/users/:id',async (req,res)=>{

    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }

    // User.findById(_id).then((user)=>{
    //     if(!user){
    //         return res.status(404).send('No User found')
    //     }

    //     res.send(user)
    // }).catch((er)=>{
    //     res.status(500).send()
    // })
})

router.patch('/users/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((up)=>{
         return allowedUpdates.includes(up)
    })  
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid update'})
    }
  
    try{
        const user = await User.findById(req.params.id) 
        if(!user){
            return res.status(404).send('User not found')
         }
        updates.forEach((item)=>{
            user[item] = req.body[item]
        })

        await user.save()
    //   const user = await User.findByIdAndUpdate(req.params.id, req.body, { new:true , runValidators:true})
      
      res.send(user)
    }catch(e){
      res.status(400).send(e)
    }
  
  })

  router.delete('/users/:id', async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send('User not found')
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router 