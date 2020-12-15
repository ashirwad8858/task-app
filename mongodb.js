const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


// const id = new ObjectID();
// console.log(id.toHexString());
MongoClient.connect(connectionURL,{ useNewUrlParser:true }, (error,client)=>{
    if(error){
        return console.log('Not connected with database')
    }

    // console.log('Connected to database')
    const db = client.db(databaseName)

    db.collection('users').updateOne({
        // _id : new ObjectID("5faec320b2f5ba0e20dde492")
        age : 2
    },{
        $set:{
            name : "A"
        }
    }).then((result)=>{
        console.log(result.modifiedCount)
    }).catch((erro)=>{
        console.log(erro)
    })

    // db.collection('tasks').updateMany({
    //     completed:true
    // },{
    //     $set:{
    //         completed:false
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((er)=>{
    //     console.log(er)
    // })


    // db.collection('users').find({name:'Ashi'}).toArray((err,user)=>{
    //     console.log(user)
    // })


    // db.collection('user').findOne({name:'Ashi'} , (err,user)=>{
    //     if(err){
    //         return console.log('user not found')
    //     }

    //     console.log(user)

    // })

    // db.collection('users').findOne({_id : new mongodb.ObjectID("5fb27c46efa0fd1dcccec78a")} , (err,user)=>{
    //     if(err){
    //         return console.log('user not found')
    //     }

    //     console.log(user)

    // })


    // db.collection('users').insertOne({
    //     _id : id,
    //     name:'Ash',
    //     age:'25'
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to insert')
    //     }

    //     console.log(result.ops);
    // })

    // db.collection('tasks').insertMany([
    //     {   description:'Clean the house',
    //         completed:true
    //     },{
    //         description:'Renew inspation',
    //         completed:true
    //     },{
    //         description:'Pot a plant',
    //         completed:false
    //     }],(err,result)=>{
    //         if(err){
    //             return console.log('unable to insert')
    //         }

    //         console.log(result.ops)
    //     })



})