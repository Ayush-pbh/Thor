
// const {MongoClient} = require('mongodb')
// // creating our main funiton
// async function main(){
//     const uri = "mongodb+srv://yefj:zxc345bnm@cluster0.amxov.mongodb.net/Pothole?retryWrites=true&w=majority"
//     const client = new MongoClient(uri)

//     try{
//         //connencting to our cluster
//         await client.connect()
//         await listDatabase(client)
//     }
//     catch (e){
//         console.log(e)
//     }
//     // finally{
//     //     await client.close()
//     // }
// }

// main().catch(error => console.log(error))

// function listDatabase(client){
//     dbList =  client.db().admin().listDatabases()
//     console.log("Databases"+dbList.databases)
//     // dbList.databases.forEach(db => {
//     //     console.log(` - ${db.name}`)
//     // })
// }


const mongoose = require('mongoose')

c = mongoose.connect(
    "mongodb+srv://yefj:zxc345bnm@cluster0.amxov.mongodb.net/Pothole?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

c.then(d => {
    console.log(d)
})

