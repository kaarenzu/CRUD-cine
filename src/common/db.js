import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = "mongodb+srv://ev3_express:Iplacex2025@cluster-express.3yri4pb.mongodb.net/?retryWrites=true&w=majority&appName=cluster-express"

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export default client;