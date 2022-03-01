"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSurvey = exports.DeleteSurvey = exports.CreateSurvey = exports.GetOneSurvey = exports.GetAllSurveys = void 0;
const mongodb_1 = require("mongodb");
const utils_1 = require("../../utils");
require("dotenv").config();
const GetAllSurveys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield utils_1.connectMongo();
        yield client.connect();
        const database = client.db(`${process.env.MONGODB_NAME}`);
        const collection = database.collection(`${process.env.MONGODB_CNAME}`);
        const result = yield collection.find({}).toArray();
        res.send(result);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.GetAllSurveys = GetAllSurveys;
const GetOneSurvey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield utils_1.connectMongo();
        yield client.connect();
        const id = req.params.id;
        if (!id) {
            res.send("Please provide id parameter");
            return;
        }
        const database = client.db(`${process.env.MONGODB_NAME}`);
        const collection = database.collection(`${process.env.MONGODB_CNAME}`);
        const result = yield collection
            .find({ _id: new mongodb_1.ObjectId(`${id}`) })
            .toArray();
        res.send(result);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.GetOneSurvey = GetOneSurvey;
const CreateSurvey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = req.body.question;
        const response = req.body.response;
        const name = req.body.name;
        if (!question || !response || !name) {
            res.send("Please provide all fields (question,response,name)");
            return;
        }
        const client = yield utils_1.connectMongo();
        yield client.connect();
        const database = client.db(`${process.env.MONGODB_NAME}`);
        const collection = database.collection(`${process.env.MONGODB_CNAME}`);
        yield collection.insertMany([req.body]);
        res.send([req.body]);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.CreateSurvey = CreateSurvey;
const DeleteSurvey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield utils_1.connectMongo();
        yield client.connect();
        const database = client.db(`${process.env.MONGODB_NAME}`);
        const collection = database.collection(`${process.env.MONGODB_CNAME}`);
        const id = req.params.id;
        if (!id || id.length < 24) {
            res.send("Please provide proper id parameter");
            return;
        }
        const survey = yield collection
            .find({ _id: new mongodb_1.ObjectId(`${id}`) })
            .toArray();
        if (!survey) {
            res.send("Survey not found");
            return;
        }
        const result = yield collection.deleteMany({ _id: new mongodb_1.ObjectId(`${id}`) });
        res.send(result);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.DeleteSurvey = DeleteSurvey;
const UpdateSurvey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const client = yield utils_1.connectMongo();
        yield client.connect();
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
        const survey = yield collection
            .find({ _id: new mongodb_1.ObjectId(`${id}`) })
            .toArray();
        if (!survey) {
            res.send("Survey not found");
            return;
        }
        const question = (_a = req.body.question) !== null && _a !== void 0 ? _a : survey[0].question;
        const response = (_b = req.body.response) !== null && _b !== void 0 ? _b : survey[0].response;
        const result = yield collection.updateOne({ _id: new mongodb_1.ObjectId(`${id}`) }, { $set: { question: question, response: response } });
        res.send(result);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.UpdateSurvey = UpdateSurvey;
