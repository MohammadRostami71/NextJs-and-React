import {getSession} from "next-auth/client";
import connectToDatabase from "../../../lib/db";
import {hashPassword, verifyPassword} from "../../../lib/auth";

const handler = async (req, res) => {
    if (req.method !== 'PATCH') {
        return;
    }
    const session = await getSession({req: req});
    if (!session) {
        res.status(401).json({message: 'not authenticated'});
        return;
    }
    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const client = await connectToDatabase();
    const usersCollection = client.db().collection('users');
    const user = await usersCollection.findOne({
        email: userEmail
    });
    if (!user) {
        res.status(404).json({message: 'No user found'});
        await client.close();
        return;
    }
    const currentPassword = user.password;
    const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);
    if (!passwordsAreEqual) {
        res.status(403).json({message: 'Invalid Password'});
        await client.close();
        return;
    }
    const hashedPassword = hashPassword(newPassword);
    const result = await usersCollection.updateOne({email: userEmail}, {$set: {password: hashedPassword}});
    await client.close()
    res.status(200).json({message: 'password updated!'});
};

export default handler;