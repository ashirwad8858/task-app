const express = require('express')
const router = new express.Router()
const Task = require('../models/tasks')

router.post('/task',async (req,res)=>{
    const task = new Task(req.body)
    try{
        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }

    // task.save().then(()=>{
    //     res.status(201).send(task)
    // }).catch((er)=>{
    //     res.status(400).send(er)
    // })
})



router.get('/task', async (req,res)=>{
    try{
        const task = await Task.find({})
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }

    // Task.find({}).then((task)=>{
    //     res.send(task)
    // }).catch((er)=>{
    //     res.status(500).send()
    // })
})


router.get('/task/:id',async (req,res)=>{
    const _id = req.params.id
    try{
        const task = await Task.findById(_id)
        if(!task){
            return res.send('No task found')
        }
        
        res.send(task) 
    }catch(e){
        res.status(500).send(e)
    }
    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.send('No task found')
    //     }

    //     res.send(task)
    // }).catch((er)=>{
    //     res.status(500).send()
    // })
})



router.patch('/task/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((a)=>{
        return allowedUpdates.includes(a)
    })
    if(!isValidOperation){
        return res.status(404).send('Invalid task')
    }

    try{
        const task = Task.findById(req.params.id)

        updates.forEach((item)=>{
            task[item] = req.body[item]
        })

        await task.save()
        // const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})


router.delete('/task/:id', async (req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
           return res.status(404).send('task not found')
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router 