

const API_KEY = "2b2802fb51ec69c0be1a70399e03270d";
const LOCAL_STORAGE_KEY = "weather-dashboard-history"

//calling the API key
function searchWeather(searchValue, callback) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&APPID=${API_KEY}`)
        //a promise
        .then(res => {
            return res.json();
        }).then(function (res) {
            console.log(res);
            //is a function that is postFiveDayForecast
            callback(res)
            //if there are errors
        }).catch(err => {
            console.log('catch error')
            console.log(err)
            callback(err)
        })
}

function saveHistory(searchValue) {
    const localhistory = localStorage.getItem(LOCAL_STORAGE_KEY) || "";
    localStorage.setItem(LOCAL_STORAGE_KEY, localhistory + `\n${searchValue}`)
}

function postFiveDayForecast(result) {
    if (result.cod == "200") {
        // yaaaaa a city
        saveHistory(result.city.name)
        loadHistory()
        // make html dance for the fellas
    } else if (result.cod == "404") {
        // not a citty
        // log err msg saying city not found
        console.error("darn")
    }

}

function loadHistory() {
    const localhistory = localStorage.getItem(LOCAL_STORAGE_KEY) || "";
    let cities = localhistory.split('\n')
    cities.map(city => {
        $('#citylist').append(
            `<div id=${city}class="form-inline form-group">
        <button class="btn btn-primary" id="search-button">${city}
        </button></div>`)
    })
}


$(document).ready(function () {

    loadHistory()

    $("#search-button").on("click", function () {
        searchValue = $("#search-value").val();
        console.log(searchValue)
        $("search-value").val("")
        searchWeather(searchValue, postFiveDayForecast)
    });

    function firstRow(response) {
        // creating 1st row for current weather
        let weatherIcon = response.weather.icon;
        console.log(weatherIcon);
        let todaysWeather = $("<h2>").text(searchValue + ": " + date + weatherIcon);

    }
})