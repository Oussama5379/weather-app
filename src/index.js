import "./styles.css";
import "./assets/videos/cloud_moving.mp4";
async function getWeatherData(location) {
	const response = await fetch(
		"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
			location +
			"?unitGroup=metric&key=FJ8ACVASDHKR5MQN9SH53XF5B&iconSet=icons2",
		{ mode: "cors" }
	);
	if (!response.ok) {
		throw new Error("Location not found");
	}
	const weatherData = await response.json();
	return weatherData;
}
let data = await getWeatherData("london");
console.log(data);

const searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("keypress", async (event) => {
	if (event.key === "Enter") {
		let location = searchBar.value;
		if (!location) return;
		try {
			let weatherData = await getWeatherData(location);
			fillWeatherInfo(weatherData, 0);
			fillWeatherInfo(weatherData, 1);
		} catch (error) {
			console.log(error.message);
			document.querySelector(".today-info").innerHTML = `<p class="error">Location not found</p>`;
		}
	}
});

async function fillWeatherInfo(weatherData, dayIndex) {
	let day;
	if (dayIndex == 0) {
		day = "today";
	} else {
		day = "tomorrow";
	}
	const dayInfo = document.querySelector("." + day + "-info");
	dayInfo.innerHTML = "";
	const infoTop = document.createElement("div");
	const infoMiddle = document.createElement("div");
	const infoBottom = document.createElement("div");
	const temperature = document.createElement("div");
	const humidity = document.createElement("div");
	const wind = document.createElement("div");
	const iconDiv = document.createElement("div");
	const address = document.createElement("h2");
	infoTop.classList.add("info-top");
	infoMiddle.classList.add("info-middle");
	infoBottom.classList.add("info-bottom");
	temperature.classList.add("temperature");
	humidity.classList.add("humidity");
	wind.classList.add("wind");
	iconDiv.classList.add("icon");
	address.textContent = weatherData.resolvedAddress;
	infoTop.appendChild(address);
	infoTop.innerHTML += "<br>Date :" + weatherData.days[dayIndex].datetime;
	dayInfo.appendChild(infoTop);
	temperature.innerHTML =
		weatherData.days[dayIndex].temp + "°C  <br/>" + weatherData.days[dayIndex].conditions;
	infoMiddle.appendChild(temperature);
	const icon = document.createElement("img");
	icon.id = day + "-icon";
	iconDiv.appendChild(icon);
	infoMiddle.appendChild(iconDiv);
	dayInfo.appendChild(infoMiddle);
	const iconImg = await import(`./assets/icons/${weatherData.days[dayIndex].icon}.png`).default;
	icon.src = iconImg;
	humidity.textContent = "Humidity: " + weatherData.days[dayIndex].humidity + "%";
	wind.textContent = "Wind: " + weatherData.days[dayIndex].windspeed + "km/h";
	infoBottom.append(humidity);
	infoBottom.append(wind);
	dayInfo.append(infoBottom);
}
