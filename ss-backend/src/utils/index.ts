export const connectMongo = async () => {
  require("dotenv").config();
  const { MongoClient, ServerApiVersion } = require("mongodb");
  const uri = `mongodb+srv://mongo:${process.env.MONGODB_PASS}@ssdatabase.npolh.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  return await client;
};
