const express = require('express');
const path = require('path');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ serve frontend properly
app.use(express.static(path.join(__dirname, 'public')));

// image route
app.get('/profile-picture', function (req, res) {
  let img = fs.readFileSync(
    path.join(__dirname, 'public/images/profile-1.jpg')
  );
  res.writeHead(200, { 'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

// Mongo URLs
const mongoUrlLocal = "mongodb://admin:password@localhost:27017";
const mongoUrlDocker = "mongodb://admin:password@apphorizon-mongodb-1:27017";

// use docker URL by default
const mongoUrl = mongoUrlDocker;

const mongoClientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const databaseName = "my-db";

// update profile
app.post('/update-profile', function (req, res) {
  const userObj = req.body;
  userObj.userid = 1;

  MongoClient.connect(mongoUrl, mongoClientOptions, function (err, client) {
    if (err) {
      console.error(err);
      return res.status(500).send("DB error");
    }

    const db = client.db(databaseName);

    db.collection("users").updateOne(
      { userid: 1 },
      { $set: userObj },
      { upsert: true },
      function () {
        client.close();
        res.send(userObj);
      }
    );
  });
});

// get profile
app.get('/get-profile', function (req, res) {
  MongoClient.connect(mongoUrl, mongoClientOptions, function (err, client) {
    if (err) {
      console.error(err);
      return res.status(500).send("DB error");
    }

    const db = client.db(databaseName);

    db.collection("users").findOne({ userid: 1 }, function (err, result) {
      client.close();
      res.send(result || {});
    });
  });
});

// ✅ IMPORTANT for Docker
app.listen(3000, '0.0.0.0', () => {
  console.log("app listening on port 3000!");
});

