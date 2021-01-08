

const API_KEY = "2b2802fb51ec69c0be1a70399e03270d";
const LOCAL_STORAGE_KEY = "weather-dashboard-history"


function searchWeather(searchValue) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&APPID=${API_KEY}`)
        .then(res => {
            return res.json();
        }).then(function (res) {
            console.log(res);
        }).catch(err => {
            console.log('catch error')
            console.log(err)
        })
}

function saveHistory(searchValue) {
    const localhistory = localStorage.getItem(LOCAL_STORAGE_KEY);
    localStorage.setItem(LOCAL_STORAGE_KEY, localhistory + str(`\n${searchValue}`))
}

$(document).ready(function () {

    $("#search-button").on("click", function () {
        searchValue = $("#search-value").val();
        console.log(searchValue)
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