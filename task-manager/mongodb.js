//CRUD Operations

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to MongoDB Database!");
    }
    const db = client.db(databaseName);
    db.collection("tasks")
      .deleteOne({ description: "Finished React Course" })
      .then((result) => console.log(result.deletedCount))
      .catch((error) => console.log(error));
  }
);
