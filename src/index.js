const express = require('express')
require('./db/mongoos')

const User = require('./models/users')
const Task = require('./models/tasks')


const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.post('/users', async (req,res)=>{

    try{
        const user = new User(req.body)
        await user.save()
        res.send(user)
    }catch(e){
        res.status(400).send()
    }
    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })

    
})


app.post('/task',async (req,res)=>{
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

app.get('/users',async (req,res)=>{
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


app.get('/users/:id',async (req,res)=>{

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


app.get('/task', async (req,res)=>{
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


app.get('/task/:id',async (req,res)=>{
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
app.listen(port,()=>{
    console.log('Server is up and running on '+port)
})