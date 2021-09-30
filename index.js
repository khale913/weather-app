window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

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
          const { temperature, shortForecast } = data.properties.periods[0];

          // Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = shortForecast;
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
