import {MongoClient} from "mongodb";

async function handler(req, res) {
    if (req.method === 'POST') {
        const {email, name, message} = req.body;
        if (!email || !name || !message ||
            !email.includes('@') || name.trim() === '' || message.trim() === '') {
            res.status(422).json({message: 'Invalid Input '});
            return;
        }
        const newMessage = {
            email, name, message
        };
        let client;
        const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clusterName}.izscz.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
        try {
            client = await MongoClient.connect(connectionString)
        } catch (error) {
            res.status(500).json({message: error.message});
            return;
        }
        const db = client.db();
        try {
            const result = await db.collection('messages').insertOne(newMessage);
            newMessage._id = result.insertedId;
        } catch (error) {
            await client.close();
            res.status(422).json({message: error.message});
            return;
        }
        await client.close();
        res.status(201).json({message: newMessage});
    }
}

export default handler;
