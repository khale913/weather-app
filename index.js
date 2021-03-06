window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let iconInput = document.querySelector(".icon");
  let temperatureSection = document.querySelector(".degree-section");
  const temperatureSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.weather.gov/points/${lat},${long}/forecast`;

      fetch(api)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          const { temperature, shortForecast, icon } =
            data.properties.periods[0];

          console.log(icon);
          // Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = shortForecast;

          // Set icon for weather forecast
          iconInput.src = icon;

          // Formula for Celsius
          let celsius = (temperature - 32) * (5 / 9);

          // Change temp to C/F
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
      const api2 = `https://api.weather.gov/points/${lat},${long}`;
      fetch(api2)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          const { city, state } = data.properties.relativeLocation.properties;
          locationTimezone.textContent = `${city}, ${state}`;
        });
    });
  }
});
