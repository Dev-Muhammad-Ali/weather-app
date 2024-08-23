let search = document.getElementById('search');
let userLocation = document.getElementById('location');
let temp = document.getElementById('temperature')
let weatherType = document.getElementById('weather-type')
let image = document.getElementById('img')
let cityName;
let feelsLike = document.querySelector('#feels-like');
let humidity = document.querySelector('#humidity');
let windSpeed = document.querySelector('#wind-speed');
let windDeg = document.querySelector('#wind-deg');


async function getWeather(cityName){
    try{
        const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`);
        return await promise.json();
    }
    catch(err){
        alert("Something went wrong! " + err);
    }
}

async function getResult(){
    let value = cityName;
    const result = await getWeather(value);

    console.log(result);
    userLocation.innerText = result.name ;
    temp.innerText = `${result.main.temp_max}°C ` ;
    weatherType.innerText = result.weather[0].description;
    feelsLike.innerHTML = `${result.main.feels_like}°C ` ;
    humidity.innerHTML = result.main.humidity;
    windSpeed.innerHTML = result.wind.speed;
    windDeg.innerHTML = result.wind.deg;
}


document.addEventListener('keydown',event =>{
    if(event.keyCode ===13){
        cityName = search.value;
        search.value = "";
        getResult();
        console.log(cityName)
    }
})




async function getWeatherByCoords(lat , long){
    const promise = await fetch(`https://api.weatherapi.com/v1/current.json?key=30c9258d90714646a5e85005241508&q=${lat},${long}&aqi=yes`);
    return await promise.json();
}

async function getCoords(){
    navigator.geolocation.getCurrentPosition( async (position)=>{
        const response = await getWeatherByCoords(position.coords.latitude, position.coords.longitude)
        cityName = response.location.name;
        getResult();
    }, ()=>{
        alert('Some Error Occured')
    })
}


getCoords()



// this code can be used to get weather by user location

// async function getCoords(){
//     navigator.geolocation.getCurrentPosition( async (position)=>{
//         const response = await getWeatherByCoords(position.coords.latitude, position.coords.longitude)
//         console.log(response);
//         userLocation.innerText = response.location.name ;
//         temp.innerText = `${response.current.temp_c}°C ` ;
//         weatherType.innerText = response.current.condition.text;
//         image.src = `${response.current.condition.icon}`;
//         feelsLike.innerHTML = `${response.current.feelslike_c}°C ` ;
//         humidity.innerHTML = `${response.current.humidity}`;
//         windMph.innerHTML = `${response.current.wind_mph}`;
//         windkph.innerHTML = `${response.current.wind_kph}`;
//     },()=>{
//         alert("Some Error Occured")
//     })
// }