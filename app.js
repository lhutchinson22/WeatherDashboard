console.log("sanity check");

$("document").ready(function () {
  // moment.js
  //   var now = moment().format("LLLL");
  //   console.log(now);
  //   currentDay.append(now);

  var fetchButton = document.getElementById("fetch-button");
  var cityInput = document.getElementById("search-input-text");
  var currentForecast = document.getElementById("main-search-output");

  $("#fetch-button").on("click", function (event) {
    event.preventDefault();
    console.log("search button is clicked");

    // grab text from input box and append to search history box
    var citySearchText = $(cityInput).val();
    console.log(citySearchText);

    var citySearchArray = [];
    citySearchArray.push(citySearchText);
    console.log(citySearchArray);

    for (var i = 0; i < citySearchArray.length; i++) {
      //   var createInputDiv = document.createElement("div");
      // createInputDiv.textContent = citySearchArray[i]

      $("#search-history").append(citySearchArray[i] + " " + "<br>");
    }

    // fetch request
    var apiKey = "89e5c40c6fdcef655f97ee07fb64e4b1";
    var requestUrl =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      citySearchText +
      "&appid=" +
      apiKey;
    console.log(requestUrl);

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        var latitude = data.coord.lat;
        var longitude = data.coord.lon;

        uvIndex(latitude, longitude);

        $("#temp").text("TEMP IN K: " + data.main.temp);
        $("#humidity").text("HUMIDITY: " + data.main.humidity);
        $("#windSpeed").text("WIND SPEED: " + data.wind.speed);

        var requestUrlFiveDay =
          "http://api.openweathermap.org/data/2.5/forecast?q=" +
          citySearchText +
          "&appid=" +
          apiKey;
        console.log(requestUrlFiveDay);

        fetch(requestUrlFiveDay)
          .then(function (fiveDayResponse) {
            return fiveDayResponse.json();
          })
          .then(function (dataFiveDay) {
            console.log(dataFiveDay);

            for (let i = 0; i < dataFiveDay.list.length; i++) {
              if (dataFiveDay.list[i].dt_txt.indexOf("18:00:00") !== -1) {
                console.log("Hello");
                $("#fiveDayForecast").append(
                  `
                    <div class="example">${dataFiveDay.list[i].main.temp}</div>
                    `
                );
              }
            }
          });
      });
  });

  function uvIndex(lat, lon) {
    var apiKey = "89e5c40c6fdcef655f97ee07fb64e4b1";
    var requestUrl =
      "http://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey;

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        $("#uvIndex").text("UV INDEX: " + data.value);
      });
  }
});
