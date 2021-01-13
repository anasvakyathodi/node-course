require("../src/db/mongoose.js");
const Task = require("./../src/models/task.js");

// Task.findByIdAndDelete("5fe61914d39e483b84cb4f42")
//   .then(() => {
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));
const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("")
  .then((count) => console.log(count))
  .catch((error) => console.log(error));
