console.log("hello from client");

const handleSearch = (e) => {
  var content = document.querySelectorAll(".content");
  e.preventDefault();
  content[0].textContent = "Loading...";
  content[1] = "";
  content[2] = "";
  content[3] = "";
  fetch(`/weather?address=${document.forms[0].elements[0].value}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          content[0].textContent = data.error;
          content[1] = "";
          content[2] = "";
          content[3] = "";
        } else {
          content[0].textContent = `Place : ${data.place} `;
          content[1].textContent = `Weather : ${data.weather} `;
          content[2].textContent = `Time : ${data.time}`;
          content[3].textContent = `Probability : ${data.probability}`;
        }
        if (content[0].value !== "") {
          document.querySelector(".weather-content").style.border =
            "0.2rem solid #ccc";
        } else {
          document.querySelector(".weather-content").style.border = "none";
        }
      });
    }
  );
  document.forms[0].elements[0].value = "";
};

const handleEvent = () => {
  document.forms[0].addEventListener("submit", handleSearch);
};
