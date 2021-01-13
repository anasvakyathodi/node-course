const express = require("express");
const port = process.env.PORT || 5000;
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const { ObjectID } = require("mongodb");
require("./db/mongoose.js");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log("Server is listening on Port " + port));
