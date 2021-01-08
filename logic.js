

const API_KEY = "2b2802fb51ec69c0be1a70399e03270d";
const LOCAL_STORAGE_KEY = "weather-dashboard-history"

//calling the API key
function searchWeather(searchValue, callback) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&APPID=${API_KEY}`)
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
        })
}

function saveHistory(searchValue) {
    const localhistory = localStorage.getItem(LOCAL_STORAGE_KEY) || "";
    localStorage.setItem(LOCAL_STORAGE_KEY, localhistory + `\n${searchValue}`)
}

function getOneCallApi(coords, callback) {
    fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&APPID=${API_KEY}`)
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
        })
}

function writeCurrentConditionsToDom(res) {
    let climatenow = $("#climatenow")
    climatenow.html(`
    <div>
        <h2>${res.name}</h2>
        <img src="http://openweathermap.org/img/wn/${res.weather[0].icon}.png" />
        <h2> Temperature: ${(res.main.temp - 32) / 1.8} </h2>
        <h2> Humidity: ${res.main.humidity} </h2>
        <h2> UV Index:  </h2>
    </div>`)


}

function addUvi(uvi) {
    $("#uti").text(`UVI: ${uvi}`)
}

function unixToTime(x) {
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(x);
    return d
}

function writeFiveDaysToDom(res) {
    // addUvi(res.current.uvi)
    let forcast = res.daily.slice(1, 5)
    $("#nextfivedays").html(forcast.map(x => `
    <div class="card">
    <div class="card-body">
        <h4>${unixToTime(x.dt)}</h4>
        <img src="http://openweathermap.org/img/wn/${x.weather[0].icon}.png" />
        <h6>Temp ${(x.temp.max - 32) / 1.8}</h6>
        <h6>Humidity ${x.humidity}</h6>
    </div>
  </div>`))
}

function postFiveDayForecast(result) {
    if (result.cod == "200") {
        // yaaaaa a city
        saveHistory(result.name)
        loadHistory()
        writeCurrentConditionsToDom(result)
        // make html dance for the fellas
        getOneCallApi(result.coord, writeFiveDaysToDom)
    } else if (result.cod == "404") {
        // not a citty
        // log err msg saying city not found
        console.error("darn")
    }

}

function loadHistory() {
    const localhistory = localStorage.getItem(LOCAL_STORAGE_KEY) || "";
    if (!localhistory) {
        return;
    }
    let cities = localhistory.split('\n')
    cities.map(city => {
        $('#citylist').append(
            `<div id=${city} class="city form-inline form-group">
        <button class="btn btn-primary" id="search-button">${city}
        </button></div>`)
    })
}


$(document).ready(function () {

    // load any searches saved from previou
    loadHistory()

    // event handler for search button
    $("#search-button").on("click", function () {
        searchValue = $("#search-value").val();
        console.log(searchValue)
        $("search-value").val("")
        searchWeather(searchValue, postFiveDayForecast)
    });

    // event handler for cities (past searches)
    $(".city").on("click", function (event) {
        let searchValue = $(this).attr("id");
        searchWeather(searchValue, postFiveDayForecast)
    });

})
