import {MongoClient} from "mongodb";

const connectToDatabase = async () => {
    const client = await MongoClient.connect('mongodb+srv://mohammad:mohammad0@cluster0.izscz.mongodb.net/myAuthDatabase?retryWrites=true&w=majority');
    return client;
};

export default connectToDatabase;