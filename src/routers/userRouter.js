const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require('../models/users')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomMail } = require('../emails/accounts')

router.post('/users', async (req,res)=>{
    // console.log(req.body)
    try{
        const user = new User(req.body)
        await user.save()
        sendWelcomMail(user.email,user.name)
        const token = user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
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

router.post('/users/logout',auth, async (req, res, next)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })

        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req,res,)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/users/me',auth,async (req,res)=>{
    res.send(req.user)
    
    // try{
    //     const user = await User.find({})
    //     res.send(user)
    // }catch(e){
    //     res.status(500).send(e)
    // }
    
    // User.find({}).then((user)=>{
    //     res.send(user)
    // }).catch((er)=>{
    //     res.status(500).send()
    // })
})


router.patch('/users/me', auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((up)=>{
         return allowedUpdates.includes(up)
    })  
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid update'})
    }
  
    try{
        // const user = await User.findById(req.params.id) 
        updates.forEach((item)=>{
            req.user[item] = req.body[item]
        })

        await req.user.save()
    //   const user = await User.findByIdAndUpdate(req.params.id, req.body, { new:true , runValidators:true})
      
      res.send(req.user)
    }catch(e){
      res.status(400).send(e)
    }
  
  })

router.delete('/users/me', auth, async (req,res)=>{
    try{
        // const user = await User.findByIdAndDelete(req.params.id)
        // if(!user){
        //     return res.status(404).send('User not found')
        // }
        await req.user.remove()
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})


const upload = multer({

    limits:{
        fileSize:1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){   //file.originalname.endsWith('.pdf')
            return cb(new Error('Please upload pdf'))
        }

        cb(undefined,true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()

    res.send()
},(erro,req,res,next)=>{
    res.status(400).send({error:erro.message})
})

router.delete('/users/me/avatar', auth, async (req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar',async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        
        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type','image/jpg')
        res.send(user.avatar)

    }catch(e){
        res.status(404).send()
    }
})

module.exports = router 