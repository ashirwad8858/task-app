const express = require('express')
require('./db/mongoos')

const User = require('./models/users')
const Task = require('./models/tasks')


const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.post('/users',(req,res)=>{

    const user = new User(req.body)

    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })

    
})


app.post('/task',(req,res)=>{
    const task = new Task(req.body)

    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((er)=>{
        res.status(400).send(er)
    })
})

app.get('/users',(req,res)=>{
    User.find({}).then((user)=>{
        res.send(user)
    }).catch((er)=>{
        res.status(500).send()
    })
})


app.get('/users/:id',(req,res)=>{

    const _id = req.params.id

    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send('No User found')
        }

        res.send(user)
    }).catch((er)=>{
        res.status(500).send()
    })
})


app.get('/task',(req,res)=>{
    Task.find({}).then((task)=>{
        res.send(task)
    }).catch((er)=>{
        res.status(500).send()
    })
})


app.get('/task/:id',(req,res)=>{
    const _id = req.params.id

    Task.findById(_id).then((task)=>{
        if(!task){
            return res.send('No task found')
        }

        res.send(task)
    }).catch((er)=>{
        res.status(500).send();
    })
})
app.listen(port,()=>{
    console.log('Server is up and running on '+port)
})