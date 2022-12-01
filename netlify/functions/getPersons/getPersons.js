import { MongoClient } from "mongodb";
require('dotenv').config();

const mongoClient = new MongoClient(process.env.MONGODB_URI)
const clientPromise = mongoClient.connect();

export const handler = async(event)=>{
    try{
        const database = (await clientPromise).db(process.env.MONGODB_DATABASE)
        const collection = database.collection(process.env.MONGODB_COLLECTION)
        const results = await collection.find({}).toArray()
        return{
            statusCode:200,
            body: JSON.stringify(results)
        }
    } catch(error){
        return {statusCode:500, body:error.toString()}
    }
}