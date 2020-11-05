console.log("sanity check");

$("document").ready(function () {
  var fetchButton = document.getElementById("fetch-button");
  var cityInput = document.getElementById("search-input-text");
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
      });
  });
});
