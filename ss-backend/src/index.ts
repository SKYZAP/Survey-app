import {
  CreateSurvey,
  DeleteSurvey,
  GetAllSurveys,
  GetOneSurvey,
  UpdateSurvey,
} from "./components/survey-api";

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

// Request body parser
app.use(express.json());

// set the view engine to ejs
app.set("view engine", "ejs");

// Render API docs
app.get("/", cors(corsOptions), (req, res) => {
  res.render("pages/index");
});

// GET http://localhost:3000/api/survey
app.get("/api/survey", cors(corsOptions), async (req, res) => {
  await GetAllSurveys(req, res);
});

// GET http://localhost:3000/api/survey:id
app.get("/api/survey/:id", cors(corsOptions), async (req, res) => {
  await GetOneSurvey(req, res);
});

// DELETE http://localhost:3000/api/survey/:id
app.delete("/api/survey/:id", cors(corsOptions), async (req, res) => {
  await DeleteSurvey(req, res);
});

// PUT http://localhost:3000/api/survey/update/:id
app.put("/api/survey/update/:id", cors(corsOptions), async (req, res) => {
  await UpdateSurvey(req, res);
});

// POST http://localhost:3000/api/survey/create
app.post("/api/survey/create", cors(corsOptions), async (req, res) => {
  await CreateSurvey(req, res);
});

const PORT = 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () =>
  console.log(`Server is ready on http://${HOST}:${PORT}`),
);

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
