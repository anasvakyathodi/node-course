const fs = require("fs");

// const note = {
//   title: "Wings of fire",
//   author: "APJ Abdul kalam",
// };

// fs.writeFileSync("1-json.json", JSON.stringify(note));
const dataBuffer = fs.readFileSync("1-json.json");
let data = JSON.parse(dataBuffer.toString());
data.name = "Anas";
data.age = "21";
fs.writeFileSync("1-json.json", JSON.stringify(data));
