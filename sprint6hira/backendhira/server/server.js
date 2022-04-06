const express = require('express');
const {dbcreate,update,delete_url,insert,search} = require('./mongodb_facade')
const {avail_datapoints, latency_datapoints} = require('./getdata')
// const {getSuburls} = require('./fetch_urls')
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();                               // Creating object of express.js
// app.use(cors());
app.use(cors({'origin': "*"}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3001

app.listen(port, () => {console.log('http://localhost:'+port)})
// Get all the documents from mongdb
app.get('/', (req, res)=>{

     dbcreate()                                         // Calling function get data function
    .then(result => res.send(result));
    
 });

 // Get data points from published metrics
 app.get('/getdata/:urldata', async function(req, res){
    
   const url = req.params.urldata //change
   //  const points = avail_datapoints(url)  
    let avail = avail_datapoints(url)
        .then((results) => {
            return results;
        })
        .catch((err) => {
            console.log(err);
        });
   let latency = latency_datapoints(url)
        .then((results) => {
            return results;
        })
        .catch((err) => {
            console.log(err);
        });
        Promise.all([avail,latency]).then(values => { 
           
         res.send(values) 
       });                                // Calling function get data function
  
});

//  Search specific document
 app.get('/search/:searchurl', (req, res)=>{
   
   const url_value = {"url" : req.params.searchurl}
   console.log(`get url = ${req.params.searchurl}`)
   search(url_value)                                         // Calling function get data function
  .then(result => res.send(result));
  
});


// Insert value into mongodb
 app.post('/', (req, res)=>{

    const url_value = req.body.urls
    insert(url_value)                                    // Calling insert into mongodb function
    .then(result => res.send(result));
     
 });

// Update value in mongodb
 app.put('/',(req,res)=>{

    let updatedurl=req.body.updateurl           // Getting updated url
    let url = req.body.url                      // Getting url to update
    update(url,updatedurl)                              // Calling update function
    .then(result => res.send(result));
   
 });
// Delete url from mongodb
app.delete('/:url',(req,res)=>{
    let deleted_url={"url":req.params.url}                // Getting url to delete from mongodb
    delete_url(deleted_url)                             // Calling delete function
    .then(result => res.send(result));
   
})

module.exports = app