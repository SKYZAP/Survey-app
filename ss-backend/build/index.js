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
const survey_api_1 = require("./components/survey-api");
const express = require("express");
const app = express();
// Request body parser
app.use(express.json());
// set the view engine to ejs
app.set("view engine", "ejs");
// Render API docs
app.get("/", (req, res) => {
    res.render("pages/index");
});
// GET http://localhost:3000/api/survey
app.get("/api/survey", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield survey_api_1.GetAllSurveys(req, res);
}));
// GET http://localhost:3000/api/survey:id
app.get("/api/survey/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield survey_api_1.GetOneSurvey(req, res);
}));
// DELETE http://localhost:3000/api/survey/:id
app.delete("/api/survey/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield survey_api_1.DeleteSurvey(req, res);
}));
// PUT http://localhost:3000/api/survey/update/:id
app.put("/api/survey/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield survey_api_1.UpdateSurvey(req, res);
}));
// POST http://localhost:3000/api/survey/create
app.post("/api/survey/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield survey_api_1.CreateSurvey(req, res);
}));
const PORT = 3000;
const HOST = "0.0.0.0";
app.listen(PORT, HOST, () => console.log(`Server is ready on http://${HOST}:${PORT}`));
// Survey Structure #1 ✅
// Survey {
//   id: " ";
//   questions: [];
//   responses: [];
//   name: " ";
// }
// Survey Structure #2
// Survey {
//   id: "";
//   questions: [
//       Question {
//         id: "",
//         title: ""
//     }
//   ];
//   responses: [];
//   name: ""
// }
