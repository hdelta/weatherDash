var todayDate;
var month;
var day;
var year;
// APPID Specific to Subscription for Tracking
var appId = 'c40ddec4128b5e650b59def7fd9394e2';
// Specified Units Used (F/Imperial)
var units = 'imperial';
// Dynamic Method of Search (City of Zip)
var searchMethod;

// Parsing Out Searched Term from the Search Method Used
function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

// Fetching API Information From Server, Returning Result
function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

// Background Image Correlation with Current Weather Conditions
function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("./assets/img/clear.jpg")';
            break;
        case 'Clouds':
            document.body.style.backgroundImage = 'url("./assets/img/cloudy.jpg")';
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("./assets/img/rain.jpg")';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("./assets/img/storm.jpg")';
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url("./assets/img/snow.jpg")';
            break;
        default:
            break;
    }

    // Display DOM Elements    
    var weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    var temperatureEl = document.getElementById('temperature');
    var humidityEl = document.getElementById('humidity');
    var windSpeedEl = document.getElementById('windSpeed');
    var cityHeader = document.getElementById('cityHeader');
    var weatherIcon = document.getElementById('documentIconImg');
    var dateObject = new Date();
     month = dateObject.getMonth() + 1;
     day = dateObject.getDate();
     year = dateObject.getFullYear();

    todayDate = month + "/" + day + "/" + year;
    var dateEl = document.getElementById('date');
   


    // Grabbing Icon From Server
    weatherIcon.src = ' http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';

    var resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    // Round Temp Down to Nearest Whole Number w/ Degree Sign Concatenate
    temperatureEl.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windSpeedEl.innerHTML = 'Wind: ' + Math.floor(resultFromServer.wind.speed / 2.2369362921) + 'mph'
    cityHeader.innerHTML = resultFromServer.name;
    humidityEl.innerHTML = 'Humidity: ' + resultFromServer.main.humidity + '%';
    dateEl.innerHTML = todayDate;
   

    setPositionForWeatherInfo();
    setPositionForForecastInfo();
}

function setPositionForWeatherInfo() {
    var weatherContainer = document.getElementById('weatherContainer');
    var weatherContainerHeight = weatherContainer.clientHeight;
    var weatherContainerWidth = weatherContainer.clientWidth;
    

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
    weatherContainer.style.top = `calc(40% - ${weatherContainerHeight / 2}px)`;
    weatherContainer.style.visibility = `visible`;
    
}

function setPositionForForecastInfo() {
    var fiveDayForecast = document.getElementById('fiveDayForecast');
    fiveDayForecast.style.visibility = `visible`;
}


////////////////////////////////////////////////////////////// 5 Day Forecast 
// Fetching API Information From Server, Returning Result
function searchForecast(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init2(result);
    })
}

// Background Image Correlation with Current Weather Conditions
function init2(resultFromServer2) {

    // day 1
    var date1 = document.getElementById('date1');
    var dateObj = new Date(resultFromServer2.list[0].dt_txt);
    date1.innerHTML = dateObj.toLocaleString();
    var temp1 = document.getElementById('temperature1');
    temp1.innerHTML = "Temp: " + Math.floor(resultFromServer2.list[0].main.temp) + '&#176';;
    var hum1 = document.getElementById('humidity1');
    hum1.innerHTML = "Humidity: " + resultFromServer2.list[0].main.humidity;
    var icon1 = document.getElementById("documentIconImg1");
    icon1.src = ' http://openweathermap.org/img/wn/' + resultFromServer2.list[0].weather[0].icon + '.png';

    // day 2
    var date2 = document.getElementById('date2');
    var dateObj = new Date(resultFromServer2.list[8].dt_txt);
    date2.innerHTML = dateObj.toLocaleString();
    var temp2 = document.getElementById('temperature2');
    temp2.innerHTML = "Temp: " + Math.floor(resultFromServer2.list[1].main.temp) + '&#176';;
    var hum2 = document.getElementById('humidity2');
    hum2.innerHTML = "Humidity: " + resultFromServer2.list[1].main.humidity;
    var icon2 = document.getElementById("documentIconImg2");
    icon2.src = ' http://openweathermap.org/img/wn/' + resultFromServer2.list[1].weather[0].icon + '.png';

    // day 3
    var date3 = document.getElementById('date3');
    var dateObj = new Date(resultFromServer2.list[16].dt_txt);
    date3.innerHTML = dateObj.toLocaleString();
    var temp3 = document.getElementById('temperature3');
    temp3.innerHTML = "Temp: " + Math.floor(resultFromServer2.list[2].main.temp) + '&#176';;
    var hum3 = document.getElementById('humidity3');
    hum3.innerHTML = "Humidity: " + resultFromServer2.list[2].main.humidity;
    var icon3 = document.getElementById("documentIconImg3");
    icon3.src = ' http://openweathermap.org/img/wn/' + resultFromServer2.list[2].weather[0].icon + '.png';

    // day 4
    var date4 = document.getElementById('date4');
    var dateObj = new Date(resultFromServer2.list[24].dt_txt);
    date4.innerHTML = dateObj.toLocaleString();
    var temp4 = document.getElementById('temperature4');
    temp4.innerHTML = "Temp: " + Math.floor(resultFromServer2.list[3].main.temp) + '&#176';;
    var hum4 = document.getElementById('humidity4');
    hum4.innerHTML = "Humidity: " + resultFromServer2.list[3].main.humidity;
    var icon4 = document.getElementById("documentIconImg4");
    icon4.src = ' http://openweathermap.org/img/wn/' + resultFromServer2.list[3].weather[0].icon + '.png';

     // day 5
     var date5 = document.getElementById('date5');
     var dateObj = new Date(resultFromServer2.list[32].dt_txt);
     date5.innerHTML = dateObj.toLocaleString();
     var temp5 = document.getElementById('temperature5');
     temp5.innerHTML = "Temp: " + Math.floor(resultFromServer2.list[4].main.temp) + '&#176';;
     var hum5 = document.getElementById('humidity5');
    hum5.innerHTML = "Humidity: " + resultFromServer2.list[4].main.humidity;
    var icon5 = document.getElementById("documentIconImg5");
    icon5.src = ' http://openweathermap.org/img/wn/' + resultFromServer2.list[4].weather[0].icon + '.png';
}




// Eventlistener for Search Button, Prompting Weather Request 
document.getElementById('searchBtn').addEventListener('click', () => {
    var searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
        searchForecast(searchTerm);
})


