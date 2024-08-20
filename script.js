let search = document.getElementById('search');
let userLocation = document.getElementById('location');
let temp = document.getElementById('temperature')
let weatherType = document.getElementById('weather-type')
let image = document.getElementById('img')
let cityName;
let feelsLike = document.querySelector('#feels-like');
let humidity = document.querySelector('#humidity');
let windMph = document.querySelector('#wind-mph');
let windkph = document.querySelector('#wind-kph');


async function getWeather(cityName){
    const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=30c9258d90714646a5e85005241508&q=${cityName}&aqi=yes`);
    return await promise.json();
}

async function getResult(){
    let value = cityName;
    const result = await getWeather(value);

    console.log(result);
    userLocation.innerText = result.location.name ;
    temp.innerText = `${result.current.temp_c}°C ` ;
    weatherType.innerText = result.current.condition.text;
    image.src = `${result.current.condition.icon}`;
    feelsLike.innerHTML = `${result.current.feelslike_c}°C ` ;
    humidity.innerHTML = `${result.current.humidity}`;
    windMph.innerHTML = `${result.current.wind_mph}`;
    windkph.innerHTML = `${result.current.wind_kph}`;
}

document.addEventListener('keydown',event =>{
    if(event.keyCode ===13){
        cityName = search.value;
        cityName = '"'+cityName+'"'
        search.value = "";
        getResult();
        console.log(cityName)
    }
})

async function getCoords(){
    navigator.geolocation.getCurrentPosition( async (position)=>{
        const response = await getWeatherByCoords(position.coords.latitude, position.coords.longitude)
        console.log(response);
        userLocation.innerText = response.location.name ;
        temp.innerText = `${response.current.temp_c}°C ` ;
        weatherType.innerText = response.current.condition.text;
        image.src = `${response.current.condition.icon}`;
        feelsLike.innerHTML = `${response.current.feelslike_c}°C ` ;
        humidity.innerHTML = `${response.current.humidity}`;
        windMph.innerHTML = `${response.current.wind_mph}`;
        windkph.innerHTML = `${response.current.wind_kph}`;
    },()=>{
        alert("Some Error Occured")
    })
}

async function getWeatherByCoords(lat , long){
    const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=30c9258d90714646a5e85005241508&q=${lat},${long}&aqi=yes`);
    return await promise.json();
}

getCoords()