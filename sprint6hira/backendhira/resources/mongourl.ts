const { MongoClient } = require('mongodb');


async function connection(){
                const uri = "mongodb+srv://hiraaziz:hiraaziz@crud.kxkc9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
                let client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
                const clientPromise = client.connect();
                return clientPromise
}

export async function getUrls(){
        
    const client = await connection()
    const result = await client.db('webhealth').collection('urls').find().toArray();                                    // query to get all documents from database
    console.log(result)
    client.close();
    return result;

}
// Handler
