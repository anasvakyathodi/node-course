//importing all modules required to console and save into file
const chalk = require("chalk");
const fs = require("fs");

//function to add note
const addNote = (title, body) => {
  const data = loadNotes();
  const duplicateNote = data.find((note) => note.title === title);
  debugger;
  if (!duplicateNote) {
    data.push({ title: title, body: body });
    saveNotes(data);
    console.log(chalk.green.inverse("Successfully Saved!"));
  } else {
    console.log(chalk.red.inverse("Title already taken!"));
  }
};

//function to remove note
const removeNote = (title) => {
  const data = loadNotes();
  const newData = data.filter((note) => note.title !== title);
  if (data.length === newData.length) {
    console.log(chalk.red.inverse(`No Note Found with title : ${title}!`));
  } else {
    saveNotes(newData);
    console.log(chalk.green.inverse("Successfully Removed!"));
  }
};

//function to save note
const saveNotes = (notes) => {
  fs.writeFileSync("notes.json", JSON.stringify(notes));
};

//function to load note
const loadNotes = () => {
  try {
    const data = fs.readFileSync("notes.json");
    return JSON.parse(data.toString());
  } catch (e) {
    return [];
  }
};

//function to list notes
const listNotes = () => {
  const data = loadNotes();
  console.log(
    chalk.yellow("--------------------\n"),
    chalk.bold.whiteBright("\tNotes"),
    chalk.yellow("\n--------------------")
  );
  data.forEach((note) =>
    console.log(
      chalk.white("\t" + note.title),
      chalk.yellow("\n--------------------")
    )
  );
};

//function to read node
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (!note) {
    console.log(chalk.red.inverse("Title Not Found!"));
  } else {
    console.log(
      chalk.white.inverse("Note:\n"),
      chalk.yellow("--------------------\n"),
      chalk.bold.whiteBright("title: ", note.title),
      chalk.yellow("\n--------------------\n"),
      chalk.whiteBright(note.body),
      chalk.yellow("\n--------------------")
    );
  }
};

module.exports = { addNote, removeNote, listNotes, readNote };
