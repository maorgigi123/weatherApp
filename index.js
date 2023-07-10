import WEATHER_API_KEY from './apikey.js';
const apiKey = WEATHER_API_KEY
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="



const searchInput = document.querySelector(".search__input");
const searchButton = document.querySelector(".search__button");
const cloudImg = document.querySelector(".weather-icon");
const weatherDetail = document.querySelector(".weatherDetail")
const weatherBox = document.querySelector(".card");
const error = document.querySelector(".error");
async function getWeather(city)
{
	weatherBox.classList.remove('fadeIn');
	weatherDetail.classList.remove('fadeIn');
	if(city === "") 
	{
		weatherDetail.display = "none";
		weatherBox.display = 'none'
		weatherBox.style.height = '140px';
	}
	const resp = await fetch(apiUrl +city+ `&appid=${apiKey}`);
	if(resp.status == 404)
	{
		error.style.display = 'block'
		weatherDetail.display = "none";
		weatherBox.display = 'none'
		weatherBox.classList.remove('fadeIn');
		weatherDetail.classList.remove('fadeIn');
		weatherBox.style.height = '140px';
		error.classList.add('fadeIn');

	}
	const data = await resp.json();
	console.log(data);
	document.querySelector(".temp").innerHTML = Math.round(data.main.temp) +"°C";
	document.querySelector(".city").innerHTML = data.name;
	document.querySelector(".humidity").innerHTML = data.main.humidity +"%";
	document.querySelector(".wind").innerHTML = data.wind.speed +" km/h";

	const typeCloud = data.weather[0].main;
	

	switch (typeCloud) {
		case "Clouds":
				cloudImg.src = "images/clouds.png";
			break;
			case "Clear":
				cloudImg.src = "images/clear.png";
			break;
			case "Rain":
				cloudImg.src = "images/rain.png";
			break;
			case "Drizzle":
				cloudImg.src = "images/drizzle.png";
			break;
			case "Mist":
				cloudImg.src = "images/mist.png";
			break;
		default:
			cloudImg.src = "images/clouds.png";
			break;
	}

	error.style.display = 'none'
	weatherBox.style.display = ''
	weatherDetail.style.display = ''

	weatherBox.classList.add('fadeIn');
	weatherDetail.classList.add('fadeIn');

	error.classList.remove('fadeIn');
	weatherBox.style.height = '600px';

}


searchButton.addEventListener("click", () => {
	getWeather(searchInput.value);
})
searchInput.addEventListener("keypress", (event)=> {
	if (event.key === "Enter") 
		{getWeather(searchInput.value);}
})