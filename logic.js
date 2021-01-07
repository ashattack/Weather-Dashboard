$(document).ready(function () {


    $("#search-button").on("click", function () {
        searchValue = $("#search-value").val();
        $("search-value").val("")
        searchWeather(searchValue)
    });

    function firstRow(response) {
        // creating 1st row for current weather
        let weatherIcon = response.weather.icon;
        console.log(weatherIcon);
        let todaysWeather = $("<h2>").text(searchValue + ": " + date + weatherIcon);

    }
})