const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1:27017/task-manager-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (error, result) => {
    if (error) {
      return console.log(error);
    }
    console.log("MongoDB Connected");
  }
);

// const task = new Task({
//   description: "buhahaha",
// });

// task
//   .save()
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error.message));
