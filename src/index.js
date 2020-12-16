const express = require('express')
require('./db/mongoos')

const User = require('./models/users')
const Task = require('./models/tasks')
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log('Server is up and running on '+port)
})

const jwt = require('jsonwebtoken')

const myFunction = async ()=>{
    const token = jwt.sign({_id:'asb123!!'}, 'thisissecrate')
    console.log(token)
}

myFunction()