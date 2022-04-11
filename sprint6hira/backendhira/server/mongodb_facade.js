const { MongoClient, ServerApiVersion } = require('mongodb');
const {getSuburls} = require('./fetch_urls')
const {latency_alarm,avail_alarm,Delete_alarm} = require('./alarm')


// function to connect to database
async function connection(){

    const uri = process.env.mongouri;                                                   // url to connect to database
    var client = new MongoClient(uri, { useNewUrlParser: true,                          // Creating object of MongoDB client
                                        useUnifiedTopology: true, 
                                        serverApi: ServerApiVersion.v1 });              
    const connect = await client.connect();                                             // Establishing connection to mongo DB
    return client;

}

// Get all documents from database
async function dbcreate(newURL){
        
        client = await connection()
        const result = await client.db('webhealth').collection('urls').find().toArray();   // query to get all documents from database
        client.close();
        return result;
    
}


// function to update url from database
async function update(url,updatedurl){

        client = await connection()                                                        // Establishing connection
        let updatedurls={"url":updatedurl}                                                 // create update url obj
        let urls = {"url":url}                                                             // creating old url obj

        const ans = await client.db('webhealth').collection('urls').countDocuments(urls)   // mongo DB query to count url in DB

        if (ans>0){                                                                        // if url exist in DB

            Delete_alarm(urls.url).then((result) => console.log("Alarms deleted"))         //Delete old url alarms
            response= [{url:"URL Updated"}]                                                // Create response obj to send back
                                                           
            // Query to update url from database
            const result = await client.db('webhealth').collection('urls').updateOne(urls,{$set: updatedurls})             
         
                // Creating latency alarm
                setTimeout(function(){
                    latency_alarm(url).then((result) => console.log("Alarms created"))
                },1000);

                // Creating availability alarm
                setTimeout(function(){
                    avail_alarm(url).then((result) => console.log("Alarms created"))
                },1000);
                
                client.close();
                return response;
        }
        else{                                                                               // If URL does not exist
            response= [{url:"URL does not exist"}]                                          // Create response obj to send back
            client.close();                                                                 // Close connection from mongo DB
            return response;
            
        }
}

// Function to search for url and get sub-urls
async function search(urls){

    let url_data = {}                                                                       // create url_data obj
    let childrens = []                                                                      // create childrens array
    client = await connection()                                                             // Establishing connection with mongoDB
    
    // Query to update url from database
    const ans = await client.db('webhealth').collection('urls').countDocuments(urls)

    if (ans>0){
        
        // Getting sub-URLs
        const suburls = await getSuburls(urls.url)

        for (let i=0; i<suburls.length;i++){
            
            // adding sub-URLs in children array in form of obj
            childrens[i]={'name' : suburls[i]}
        }
     
        // adding name and children in form of obj
        url_data = {'name': urls.url, 'children' : childrens}

        client.close();
        return url_data
    }
    else{
        response= {"name":[null]}                                                           // Create response obj to send back
        client.close();                                                                     // Close mongo DB connection
        return response;
        
    }
}

// function to delete url from database
async function delete_url(data_delete){
    
    client = await connection()                                                                 // create url_data obj
    const ans = await client.db('webhealth').collection('urls').countDocuments(data_delete)     // mongo DB query to count url in DB
   
    if (ans>0){                                                                                 // if URL exist

        Delete_alarm(data_delete.url).then((result) => console.log("Alarms deleted"))           // Delete alarms
        response="URL Deleted"                                                                  // Create response string to send back
        const result = await client.db('webhealth').collection('urls').deleteOne(data_delete)   // Query to delete url from database
        client.close();                                                                         // Close connection
        return response
    }
    else{
        response= "URL does not exist"                                                          // Create response string to send back
        client.close();                                                                         // Close connection
        return response;
        
    } 
}


// function to insert url 
async function insert(url){
  
    client = await connection()                                                                 // Establishing connection
    const value_insert = { "url":url }                                                          // creating obj of url
    const ans = await client.db('webhealth').collection('urls').countDocuments(value_insert)    // mongo DB query to count url in DB

    if (ans>0){                                                                                 // if URL exist

        response="URL already exists"                                                           // setting up respnse to send back
        client.close();                                                                         // close connection
        return response

    }
    else{                                                                                       // if URL does not exist

        response= "URL inserted"                                                                // setting up respnse to send back
        const result = await client.db('webhealth').collection('urls').insertOne(value_insert); // Query to insert url into database
       
        // Creating availability alarm
        setTimeout(function(){
            latency_alarm(url).then((result) => console.log("Alarms created"))
        },1000);

        // Creating latency alarm
        setTimeout(function(){
            avail_alarm(url).then((result) => console.log("Alarms created"))
        },1000);

        client.close();                                                                           // close connection
        return response;
        
    }
     
}


module.exports.dbcreate = dbcreate
module.exports.update = update
module.exports.delete_url = delete_url
module.exports.insert = insert
module.exports.search = search
