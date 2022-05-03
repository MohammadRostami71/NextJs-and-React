import {connectToDatabase, getAllDocument, insertDocument} from "../../../helper/db-util";

async function handler(req, res) {
    const eventId = req.query.eventId;
    let client;
    try {
        client = await connectToDatabase();
    } catch (error) {
        res.status(500).json({message: 'cant connect to db'});
        return;
    }
    if (req.method === 'POST') {
        const {email, name, text} = req.body;
        if (!email.includes('@') || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({message: 'invalid comment.'});
            await client.close();
            return;
        }
        const newComment = {
            id: new Date().toISOString(),
            name, email, text, eventId
        };
        let result;
        try {
            result = await insertDocument(client, 'comments', newComment);
            newComment._id = result.insertedId;
            res.status(201).json({message: 'comment added', comment: newComment});
        } catch (error) {
            res.status(500).json({message: 'cant insert in db'});
        }
    }
    if (req.method === 'GET') {
        let documents;
        try {
            documents = getAllDocument(client, 'comments', {_id: -1});
            res.status(200).json({comments: documents})
        } catch (error) {
            res.status(500).json({message: 'cant insert in db'});
        }
    }
    await client.close();
}

export default handler;