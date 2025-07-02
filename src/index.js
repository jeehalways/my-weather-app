function updateDateTime() {
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[now.getDay()];
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  const currentDetails = document.querySelector(".current-details");
  currentDetails.innerHTML = `${day} ${hours}:${minutes}, moderate rain <br />
    Humidity: <strong>87%</strong>, Wind: <strong>7.2km/h</strong>`;
}

function handleSearch(event) {
  event.preventDefault();
  const input = document.querySelector(".search-input");
  if (input.value.trim() !== "") {
    const city = input.value.trim();
    const apiKey = "3ed42bdf70af90btac454840e3c5oa26";
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    console.log("city", city);
    axios.get(apiUrl).then(onCitySearch);
  }
  //
}

document.addEventListener("DOMContentLoaded", () => {
  updateDateTime();
  const form = document.querySelector("form");
  form.addEventListener("submit", handleSearch);
});

function onCitySearch(response) {
  console.log(response);
  if (response.data.temperature) {
    const temperature = Math.round(response.data.temperature.current);
    const city = response.data.city;

    const cityElement = document.querySelector("h1");
    cityElement.textContent = city;

    const temperatureElement = document.querySelector(
      ".current-temperature-value"
    );
    temperatureElement.textContent = temperature;
  } else {
    //failed
  }
}
