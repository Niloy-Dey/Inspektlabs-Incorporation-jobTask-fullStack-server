const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');
// const path = require('path')
// require('dotenv').config();

// middle ware 
app.use(cors());
app.use(express.json());




const uri = "mongodb+srv://job-task:GqtcxXO7ogs1O5ay@cluster0.pcfuy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        await client.connect();

        const imageCollection = client.db('job-task').collection('images');

           app.post('/image', async(req, res) => {
            const image = req.body;
            const result  =  await imageCollection.insertOne(image)
            res.send(result);
            })
          
            app.get('/images', async (req, res) => {
              const query = {};
              const cursor = imageCollection.find(query)
              const images = await cursor.toArray();
              res.send(images);
  
          })
   
          
    }

    finally{

    }

}
run().catch(console.dir)


app.get('/', (req, res) => {
  res.send('Hello job  project!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/* 
job-task

GqtcxXO7ogs1O5ay

*/