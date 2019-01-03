const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const app = express();
let db;

app.use(express.static("static"));
app.use(bodyParser.json());

app.get("/api/issues", (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  db.collection("issues")
    .find(filter)
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
  newIssue.created = new Date();
  if (!newIssue.status) newIssue.status = "New";

  db.collection("issues")
    .insertOne(newIssue)
    .then(result =>
      db
        .collection("issues")
        .find({ _id: result.insertedId })
        .limit(1)
        .next()
    )
    .then(newIssue => res.json(newIssue))
    .catch(err => {
      console.error(`[MongoDB - INSERT ERROR]: ${err}`);
      res.status(500).json({ message: `Internal Server Error: ${err}` });
    });
});

app.get("*", (req, res) => {
  res.sendfile(path.resolve("static/index.html"));
});

MongoClient.connect(
  "mongodb://localhost",
  { useNewUrlParser: true }
)
  .then(client => {
    db = client.db("issuetracker");
    app.listen(3000, () => {
      console.log("App started on port 3000");
    });
  })
  .catch(err => console.error(`[MongoDB - ERROR]: ${err}`));
