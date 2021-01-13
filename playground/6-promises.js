const testWork = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      return reject("Error");
    }, 2000);
  });

testWork()
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
