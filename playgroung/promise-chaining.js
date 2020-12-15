require('../src/db/mongoos')

const User = require('../src/models/users')

User.findByIdAndUpdate('5fd740a49ac86419843d6c37',{ age : 10 } ).then((user)=>{
    console.log(user)
    return User.countDocuments( { age: 10})
}).then((result)=>{
    console.log(result)
}).catch((er)=>{
    console.log(er)
})