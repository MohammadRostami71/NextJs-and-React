import connectToDatabase from "../../../lib/db";
import {hashPassword} from "../../../lib/auth";

export default async function handler(req, res) {
    if (res.method === 'POST') {
        const data = req.body;
        const {email, password} = data;
        const hashingPassword = await hashPassword(password);
        const client = await connectToDatabase();
        const db = client.db();
        if (!email || !email.includes('@') || !password || password.trim().length < 6) {
            res.status(422).json({message: 'data is Invalid'});
            await client.close();
            return;
        }

        const existingUser = await db.collection('users').findOne({email: email});
        if (existingUser) {
            res.status(422).json({message: 'existing user!'});
            await client.close()
            return;
        }
        const result = await db.collection('users').insertOne({
            email,
            password: hashingPassword
        });
        res.status(201).json({message: 'created user!'});
        await client.close()
    }
}