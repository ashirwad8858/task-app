const mongoose = require('mongoose')
const { __esModule } = require('validator/lib/isAlpha')

const Task = mongoose.model('task',{

    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false,
    }
})

module.exports = Task 