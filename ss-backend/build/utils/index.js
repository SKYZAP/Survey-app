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
exports.connectMongo = void 0;
const connectMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    require("dotenv").config();
    const { MongoClient, ServerApiVersion } = require("mongodb");
    const uri = `mongodb+srv://mongo:${process.env.MONGODB_PASS}@ssdatabase.npolh.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
    });
    return yield client;
});
exports.connectMongo = connectMongo;
