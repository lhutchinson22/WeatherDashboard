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
      $("#search-history").append(citySearchArray[i] + " " + "<br>");
    }

    // fetch request
    var apiKey = "89e5c40c6fdcef655f97ee07fb64e4b1";
    var requestUrl =
      "api.openweathermap.org/data/2.5/weather?q=" +
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
        //Loop over the data to generate a table, each table row will have a link to the repo url
        //   for (var i = 0; i < data.length; i++) {
        //     // Creating elements, tablerow, tabledata, and anchor
        //     var createTableRow = document.createElement("tr");
        //     var tableData = document.createElement("td");
        //     var link = document.createElement("a");

        // Setting the text of link and the href of the link
        //   link.textContent = data[i].html_url;
        //   link.href = data[i].html_url;

        // Appending the link to the tabledata and then appending the tabledata to the tablerow
        // The tablerow then gets appended to the tablebody
        //   tableData.appendChild(link);
        //   createTableRow.appendChild(tableData);
        //   tableBody.appendChild(createTableRow);
        //   }
      });
  });
});
// fetchButton.addEventListener("click", getApi);
