try {
  const tasks = {
    tasks: [
      {
        text: "Grocery shopping",
        completed: true,
      },
      {
        text: "Clean yard",
        completed: false,
      },
      {
        text: "Film course",
        completed: false,
      },
    ],
    getTasksTodo() {
      return this.tasks.filter((task) => task.completed === false);
    },
  };
  console.log(tasks.getTasksToDo());
} catch (error) {
  console.log(error);
}
