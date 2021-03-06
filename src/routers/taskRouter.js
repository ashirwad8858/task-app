const express = require('express')
const router = new express.Router()
const Task = require('../models/tasks')
const auth = require('../middleware/auth')

router.post('/task', auth, async (req,res)=>{
    // const task = new Task(req.body)

    const task = new Task({
        ...req.body,
        owner:req.user._id
    })
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



router.get('/tasks', auth, async (req,res)=>{
    const match = {}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try{
        // const task = await Task.find({})
        await req.user.populate({
            path : 'tasks',
            match ,
            option : {
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send(e)
    }

    // Task.find({}).then((task)=>{
    //     res.send(task)
    // }).catch((er)=>{
    //     res.status(500).send()
    // })
})


router.get('/task/:id', auth, async (req,res)=>{
    const _id = req.params.id
    try{
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner:req.user._id})
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



router.patch('/task/:id', auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((a)=>{
        return allowedUpdates.includes(a)
    })
    if(!isValidOperation){
        return res.status(404).send('Invalid task')
    }

    try{
        // const task = Task.findById(req.params.id)
        const task = await Task.findOne({_id:req.params.id, owner: req.user._id})
        
        // const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!task){
            res.status(404).send()
        }

        updates.forEach((item)=>{
            task[item] = req.body[item]
        })

        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})


router.delete('/task/:id', auth, async (req,res)=>{
    try{
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOne({_id:req.params.id, owner: req.user._id})

        if(!task){
           return res.status(404).send('task not found')
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router 