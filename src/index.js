import "./styles.css";
import "./assets/videos/cloud_moving.mp4";
async function getWeatherData(location) {
	const response = await fetch(
		"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
			location +
			"?key=FJ8ACVASDHKR5MQN9SH53XF5B&iconSet=icons2",
		{ mode: "cors" }
	);
	let weatherData = await response.json();
	return weatherData;
}
console.log(getWeatherData("london"));
function displayWeatherIcon(icon, elementId) {
	const iconElement = document.getElementById(elementId);
	const iconPath = `/assets/icons/${icon}.png`;
	iconElement.src = iconPath;
}
