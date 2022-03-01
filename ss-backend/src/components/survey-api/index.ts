import { ObjectId } from "mongodb";
import { connectMongo } from "../../utils";
require("dotenv").config();

export const GetAllSurveys = async (req, res) => {
  try {
    const client = await connectMongo();
    await client.connect();

    const database = client.db(`${process.env.MONGODB_NAME}`);
    const collection = database.collection(`${process.env.MONGODB_CNAME}`);
    const result = await collection.find({}).toArray();

    res.send(result);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const GetOneSurvey = async (req, res) => {
  try {
    const client = await connectMongo();
    await client.connect();
    const id = req.params.id;

    if (!id) {
      res.send("Please provide id parameter");
      return;
    }

    const database = client.db(`${process.env.MONGODB_NAME}`);
    const collection = database.collection(`${process.env.MONGODB_CNAME}`);
    const result = await collection
      .find({ _id: new ObjectId(`${id}`) })
      .toArray();

    res.send(result);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const CreateSurvey = async (req, res) => {
  try {
    const question = req.body.question;
    const response = req.body.response;
    const name = req.body.name;

    if (!question || !response || !name) {
      res.send("Please provide all fields (question,response,name)");
      return;
    }

    const client = await connectMongo();
    await client.connect();

    const database = client.db(`${process.env.MONGODB_NAME}`);
    const collection = database.collection(`${process.env.MONGODB_CNAME}`);

    await collection.insertMany([req.body]);

    res.send([req.body]);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const DeleteSurvey = async (req, res) => {
  try {
    const client = await connectMongo();
    await client.connect();
    const database = client.db(`${process.env.MONGODB_NAME}`);
    const collection = database.collection(`${process.env.MONGODB_CNAME}`);

    const id = req.params.id;

    if (!id || id.length < 24) {
      res.send("Please provide proper id parameter");
      return;
    }
    const survey = await collection
      .find({ _id: new ObjectId(`${id}`) })
      .toArray();

    if (!survey) {
      res.send("Survey not found");
      return;
    }
    const result = await collection.deleteMany({ _id: new ObjectId(`${id}`) });

    res.send(result);
  } catch (error) {
    throw new Error(error);
  }
};

export const UpdateSurvey = async (req, res) => {
  try {
    const client = await connectMongo();
    await client.connect();
    const database = client.db(`${process.env.MONGODB_NAME}`);
    const collection = database.collection(`${process.env.MONGODB_CNAME}`);

    const id = req.params.id;

    if (!id || id.length < 24) {
      res.send("Please provide id parameter");
      return;
    }

    if (!req.body.question && !req.body.response) {
      res.send("Please provide at least one field to update");
      return;
    }

    const survey = await collection
      .find({ _id: new ObjectId(`${id}`) })
      .toArray();

    if (!survey) {
      res.send("Survey not found");
      return;
    }

    const question = req.body.question ?? survey[0].question;
    const response = req.body.response ?? survey[0].response;

    const result = await collection.updateOne(
      { _id: new ObjectId(`${id}`) },
      { $set: { question: question, response: response } },
    );

    res.send(result);
  } catch (error) {
    throw new Error(error.message);
  }
};
