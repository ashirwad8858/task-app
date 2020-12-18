const express = require('express')
require('./db/mongoos')

const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')


const app = express()
const port = process.env.PORT || 3000

// app.use((req,res,next)=>{
//     if(req.method === 'GET'){
//         res.send('Get request is disable')
//     }else{
//         next()
//     }

// })

// app.use((req,res,next)=>{
//     res.status(500).send('Site is under mentinance. Please try after some time')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log('Server is up and running on '+port)
})

const Task = require('./models/tasks')
const User = require('./models/users')

const myFunction = async ()=>{
    // const task = await Task.findById('5fdcb13d3a993a21107c6c37')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('5fdc71bbee5a222b887c32d6')
    await user.populate('owner').execPopulate()
    console.log(user.tasks)
}

myFunction()