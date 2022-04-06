const { MongoClient, ServerApiVersion } = require('mongodb');
const {getSuburls} = require('./fetch_urls')
const {latency_alarm,avail_alarm,Delete_alarm} = require('./alarm')


// function to connect to database
async function connection(){

    const uri = "mongodb+srv://hiraaziz:hiraaziz@crud.kxkc9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";       // url to connect to database
    var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }); // Creating object of MongoDB client
    const connect = await client.connect();                                                                                 // Establishing connection to mongo DB
    return client;

}

// Get all documents from database
async function dbcreate(newURL){
        
        client = await connection()
        const result = await client.db('webhealth').collection('urls').find().toArray();                                    // query to get all documents from database
        client.close();
        return result;
    
}


// function to update url from database
async function update(url,updatedurl){

        client = await connection()
        let updatedurls={"url":updatedurl}           // Getting suburls
        let urls = {"url":url}  

        const ans = await client.db('webhealth').collection('urls').countDocuments(urls)

        if (ans>0){

            //Delete old url alarms
            Delete_alarm(urls.url).then((result) => console.log("Alarms deleted"))

            response= [{url:"URL Updated"}]
                const result = await client.db('webhealth').collection('urls').updateOne(urls,{$set: updatedurls})             // Query to update url from database
                console.log(result)
                setTimeout(function(){
                    latency_alarm(url).then((result) => console.log("Alarms created"))
                },1000);
                setTimeout(function(){
                    avail_alarm(url).then((result) => console.log("Alarms created"))
                },1000);
                
                client.close();
                return response;
        }
        else{
            response= [{url:"URL does not exist"}]
            return response;
            
        }
}

// Function to search for url and get sub-urls
async function search(urls){

    let url_data = {}
    let childrens = []
    client = await connection()
    
    const ans = await client.db('webhealth').collection('urls').countDocuments(urls)

    if (ans>0){
        
        const suburls = await getSuburls(urls.url)

        for (let i=0; i<suburls.length;i++){

            childrens[i]={'name' : suburls[i]}
        }
     
        url_data = {'name': urls.url,  
        'children' : childrens}

        client.close();
        return url_data
    }
    else{
        response= {"name":[null]}
        return response;
        
    }
}


// function to delete url from database
async function delete_url(data_delete){
    
    client = await connection()
    const ans = await client.db('webhealth').collection('urls').countDocuments(data_delete)
    console.log(`data to be deleted ${data_delete.url}`)
    console.log(ans)
    if (ans>0){

        // trippie123
        
        Delete_alarm(data_delete.url).then((result) => console.log("Alarms deleted"))
        
        response="URL Deleted"
        const result = await client.db('webhealth').collection('urls').deleteOne(data_delete)                                // Query to delete url from database
        console.log(result)
        client.close();
        return response
    }
    else{
        response= "URL does not exist"
        return response;
        
    } 
}


// function to insert url 
async function insert(url){
  
    client = await connection()
    const value_insert = { "url":url }
    const ans = await client.db('webhealth').collection('urls').countDocuments(value_insert)

    if (ans>0){

        response="URL already exists"
        return response

    }
    else{

        response= "URL inserted"
        const result = await client.db('webhealth').collection('urls').insertOne(value_insert);                               // Query to insert url into database
        console.log(result)
        setTimeout(function(){
            latency_alarm(url).then((result) => console.log("Alarms created"))
        },1000);
        setTimeout(function(){
            avail_alarm(url).then((result) => console.log("Alarms created"))
        },1000);
        client.close();
        return response;
        
    }
     
}


module.exports.dbcreate = dbcreate
module.exports.update = update
module.exports.delete_url = delete_url
module.exports.insert = insert
module.exports.search = search
