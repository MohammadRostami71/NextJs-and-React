import {connectToDatabase,insertDocument} from "../../helper/db-util";
async function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email;
        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({message: 'Invalid Email'});
            return;
        }
        let client;
        try {
            client = await connectToDatabase();
        } catch (error) {
            res.status(500).json({message:'cant connect to db'});
            return;
        }

        try {
            await insertDocument(client,'newsLetter', {emails: userEmail})
            await client.close();
        } catch (error) {
            res.status(500).json({message:'cant insert in db'});
            return;
        }


        res.status(201).json({message: 'sing up'})
    }
}

export default handler;