const jwt = require('jsonwebtoken')
const User = require('../models/users')


const auth = async (req,res,next)=>{
    // console.log('Auth ile')

    try{
        const token = req.header('Authorization').replace('Bearer ','')
        // console.log(token)
        const decode = jwt.verify(token,'thisissecrate')
        // console.log(decode)
        const user = await User.findOne({_id:decode._id,'tokens.token':token})

        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user
        next()

    }catch(e){
        res.status(401).send({error:'Please authenticate'})
    }

    // next()
}

module.exports = auth