console.log("sanity check");

$("document").ready(function () {
  var cityInput = document.getElementById("search-input-text");

  // get local storage
  var cityStorageArr = localStorage.getItem("city entered") || [
    "San Francisco",
  ];
  cityStorageStringify = JSON.stringify(cityStorageArr);
  var cityStorageArrSplit = cityStorageStringify.split(",");
  console.log(cityStorageArrSplit);

  for (var i = 0; i < cityStorageArrSplit.length; i++) {
    $("#search-history").append(`<div>${cityStorageArr[i]}</div>`);
  }

  $("#fetch-button").on("click", function (event) {
    event.preventDefault();

    console.log($("#citySpan").text($(cityInput).val()));

    // grab text from input box and append to search history box and search div
    var citySearchText = $(cityInput).val();
    console.log(citySearchText);
    $("#forecastOutput").addClass("styleMainForecast");

    var citySearchArray = [];
    citySearchArray.push(citySearchText);

    // save to local storage
    cityStorageArr.push(citySearchText);
    localStorage.setItem("city entered", cityStorageArr);

    for (var i = 0; i < citySearchArray.length; i++) {
      $("#search-history").append(`<div">${citySearchArray[i]}</div`);
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

                $(arrayDays[j]).append(
                  dataFiveDay.list[i].dt_txt + "<br>",
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
