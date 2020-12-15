require('../src/db/mongoos')
const Task = require('../src/models/tasks')

// Task.findByIdAndDelete('5fd744bdc4b1292d0c262329').then((task)=>{
//     console.log(task)
//    return Task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount = async (id) =>{
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed:false })
    return count
}

deleteTaskAndCount('5fd724386eaee034c8dd77e1').then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})