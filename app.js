console.log("sanity check");

$("document").ready(function () {
  var cityInput = document.getElementById("search-input-text");

  var addToLocalStorageArray = function (name, value) {
    // Get the existing data
    var existing = localStorage.getItem(name);
    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    existing = existing ? existing.split(",") : [];
    // Add new data to localStorage Array
    existing.push(value);
    // Save back to localStorage
    localStorage.setItem(name, existing.toString());
  };

  // get local storage
  var cityStorageArr = ["San Francisco"];
  //   var cityStorageArr = localStorage.getItem("city entered").split(",");
  console.log(typeof cityStorageArr);

  var citySearchArray = [];

  for (var i = 0; i < cityStorageArr.length; i++) {
    $("#search-history").append(`<div>${cityStorageArr[i]}</div>`);
  }

  $("#fetch-button").on("click", function (event) {
    event.preventDefault();
    console.log("clicked");
    console.log($("#citySpan").text($(cityInput).val()));

    // grab text from input box and append to search history box and search div
    var citySearchText = $(cityInput).val();
    console.log(citySearchText);
    $("#forecastOutput").addClass("styleMainForecast");

    citySearchArray.push(citySearchText);
    addToLocalStorageArray("city entered", citySearchText);
    $("#search-history").text("");

    for (var i = 0; i < citySearchArray.length; i++) {
      $("#search-history").append(`
      <div">${citySearchArray[i]}</div>
      <br>
      `);
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

        var kelvin = data.main.temp;
        var celsius = kelvin - 273;
        var fahrenheit = Math.floor(celsius * (9 / 5) + 32);

        $("#temp").text("Temperature: " + fahrenheit + "°F");
        $("#humidity").text("Humidity: " + data.main.humidity);
        $("#windSpeed").text("Wind Speed: " + data.wind.speed);

        var requestUrlFiveDay =
          "http://api.openweathermap.org/data/2.5/forecast?q=" +
          citySearchText +
          "&appid=" +
          apiKey;
        console.log(requestUrlFiveDay);

        var arrayDays = [
          "#dayOne",
          "#dayTwo",
          "#dayThree",
          "#dayFour",
          "#dayFive",
        ];

        fetch(requestUrlFiveDay)
          .then(function (fiveDayResponse) {
            return fiveDayResponse.json();
          })
          .then(function (dataFiveDay) {
            console.log(dataFiveDay);

            for (let i = 0, j = 0; i < dataFiveDay.list.length; i++) {
              if (dataFiveDay.list[i].dt_txt.indexOf("18:00:00") !== -1) {
                console.log(i, j, arrayDays[j]);

                var kelvin = dataFiveDay.list[i].main.temp;
                var celsius = kelvin - 273;
                var fahrenheit = Math.floor(celsius * (9 / 5) + 32);
                var grabIcon = dataFiveDay.list[i].weather[0].icon;
                var iconConverted =
                  "http://openweathermap.org/img/wn/" + grabIcon + "@2x.png";
                var icon = $("<img>").attr("src", iconConverted);

                $(arrayDays[j]).append(
                  dataFiveDay.list[i].dt_txt + "<br>",
                  icon,
                  "temp: " + fahrenheit + "&#176;" + "F" + "<br>",
                  "humidity: " + dataFiveDay.list[i].main.humidity + "<br>"
                );
                j++;
              }
            }
          });
      });
  });

  //   function getIcon(iconData) {
  //     var grabIcon = dataFiveDay.list[i].weather[0].icon;
  //     var iconConverted =
  //       "http://openweathermap.org/img/wn/" + grabIcon + "@2x.png";
  //     console.log(iconConverted);
  //     fetch(iconConverted)
  //       .then(function (responseIcon) {
  //         return responseIcon.json();
  //       })
  //       .then(function (data) {
  //         console.log(data);
  //       });
  //   }

  //   console.log(getIcon());

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
        $("#uvIndex").text("UV Index: " + data.value);
        console.log(data.value);
        // if (data.value <= 4) {
        //   $("#uvIndex").addClass("greenDiv");
        // }
      });
  }
});
