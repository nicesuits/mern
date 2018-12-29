const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const app = express();
let db;

app.use(express.static("static"));
app.use(bodyParser.json());

const issues = [
  {
    id: 1,
    status: "Open",
    owner: "Raven",
    created: new Date("2016-08-15"),
    effort: 5,
    completionDate: undefined,
    title: "Error in console when clicking Add"
  },
  {
    id: 2,
    status: "Assigned",
    owner: "Eddie",
    created: new Date("2016-08-16"),
    effort: 15,
    completionDate: new Date("2016-08-30"),
    title: "Missing bottom border on panel"
  }
];

app.get("/api/issues", (req, res) => {
  db.collection("issues")
    .find()
    .toArray()
    .then(issues => {
      const metadata = { total_count: issues.length };
      res.json({ _metadata: metadata, records: issues });
    })
    .catch(err => {
      console.error(`[MongoDB - FETCH ERROR]: ${err}`);
      res.status(500).json({ message: `Internal Server Error: ${err}` });
    });
});

app.post("/api/issues", (req, res) => {
  const newIssue = req.body;
  newIssue.id = issues.length + 1;
  newIssue.created = new Date();
  if (!newIssue.status) newIssue.status = "New";
  issues.push(newIssue);
  res.json(newIssue);
});

MongoClient.connect("mongodb://localhost")
  .then(client => {
    db = client.db("issuetracker");
    app.listen(3000, () => {
      console.log("App started on port 3000");
    });
  })
  .catch(err => console.error(`[MongoDB - ERROR]: ${err}`));
