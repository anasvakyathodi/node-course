const testWork = (callback) => {
  setTimeout(() => {
    callback(undefined, [1, 2, 3, 4]);
  }, 2000);
};

testWork((error, result) => {
  if (error) {
    return console.log(error);
  }
  console.log(result);
});
