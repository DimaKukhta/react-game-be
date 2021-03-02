import { MongoClient, Collection } from 'mongodb'
import { response } from 'express';

const url = 'mongodb+srv://dima:12345@cluster0.pglaf.mongodb.net/?retryWrites=true&w=majority';

const dbName = 'react-game';
const collectionName = 'bestPlayers'

type playerType = {
    nickName: string,
    score: number,
    date: any
}

const getMongoInstance = async () => {
    const client = await MongoClient.connect(url);
        
    return client.db(dbName);
}

const getMongoCollection = async (): Promise<Collection> => {
    const db = await getMongoInstance();

    return db.collection(collectionName);
} 

const getBestPlayers = async () => {
    const collection = await getMongoCollection();
    return collection.find({  }).toArray() || [];
}

const updateBestPlayers = async (player: playerType) => {
    const collection = await getMongoCollection();

    const response =  await collection.insertOne(player);
    return response.ops[0];
};


export {
    getBestPlayers,
    updateBestPlayers,
}