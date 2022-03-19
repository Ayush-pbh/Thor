// PRE-STUFF

const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('location-data-main.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
    // console.log(results);
});

let myhardcodedlocation = [30.4136249,77.9729378]

// SERVER


const express = require('express')
const app = express()
const path = require('path')
const router = express.Router()
const PORT = 8080

app.use(express.json())
app.use(express.static('public'))       //for static files like css js img
// This is a demo server to host a basic JSON Pothole API
router.post('/location', (req,res) => {

    const {long} = req.body        // longitude passed with the request
    const {latt} = req.body        // lattitude passed with the request
    // -------------------------
    // Here we do some backend magic and get the pothole data in a json format and 
    // store it in 
    // -------------------------
    if(long==undefined || latt == undefined){
        res.send(404).send({
            'message': 'Please provide a longitude and a lttitude'
        })
    }
    res.status(200).send({
        // The json to send comes here
        'message' : `The Pothole info comes here for long=${long} & latt=${latt}`,
        'markers' : results
    })
})

router.get('/', (req,res) => {
    // The index page is here!
    res.sendFile(path.join(__dirname, '/templates/index.html'));
})


app.use('/', router)
app.listen(
    PORT,
    () => console.log( `Server Ready at http://localhost:${PORT}`)
)



// DATABSE
