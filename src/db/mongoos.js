const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify: false
})

// const Task = mongoose.model('task',{
//     description:{
//         type :String,
//         required:true,
//         trim:true
//     },
//     completed : {
//         type : Boolean,
//         default:false
//     }
// })

// const task = new Task({
//     description:'  Eat lunch',
//     // completed : false
// })

// task.save().then(()=>{
//     console.log(task)
// }).catch((err)=>{
//     console.log(err)
// })

