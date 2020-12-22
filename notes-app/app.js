const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");
// console.log(chalk.green.inverse.bold("Success"));

//Create Note Command
yargs.command({
  command: "add",
  describe: "Add a Note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body);
  },
});

//Remote Note Command
yargs.command({
  command: "remove",
  describe: "Remove a Note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.removeNote(argv.title);
  },
});

//Create list command
yargs.command({
  command: "list",
  describe: "List all Notes",
  handler: () => {
    notes.listNotes();
  },
});
//Create a Read command
yargs.command({
  command: "read",
  describe: "Read a Note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.readNote(argv.title);
  },
});

yargs.parse();
