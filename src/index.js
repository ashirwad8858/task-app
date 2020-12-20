const express = require('express')
require('./db/mongoos')

const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')


const app = express()
const port = process.env.PORT 

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

const multer = require('multer')
const upload = multer({
    dest:'images',
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

app.post('/upload', upload.single('upload'),(req,res)=>{
    res.send()
},(erro,req,res,next)=>{
    res.status(400).send({error:erro.message})
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log('Server is up and running on '+port)
})
