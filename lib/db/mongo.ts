import { Db, MongoClient } from 'mongodb'

export type DBType = {
    client : MongoClient,
    db : Db
} 

let cachedClient : MongoClient | null = null
let cachedDb : Db | null = null

export async function DbConnect() : Promise<DBType | undefined> {
    if(cachedClient && cachedDb) {
        return {
            client : cachedClient,
            db : cachedDb
        }
    }

    const options = {
        useUnifiedTopology : true,
        useNewUrlParser : true
    }

    try { 
        //@ts-expect-error options..
        let client = new MongoClient(process.env.MONGO_URI!, options)
        await client.connect()
        let db = client.db('chat')

        cachedClient = client
        cachedDb = db

        return {
            client,
            db
        }
    }catch(e) {
        console.error(e)
    }
}