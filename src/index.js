import "./styles.css";

async function getWeatherData(location) {
	const response = await fetch(
		"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
			location +
			"?key=FJ8ACVASDHKR5MQN9SH53XF5B",
		{ mode: "cors" }
	);
	let weatherData = await response.json();
	console.log(weatherData);
}
getWeatherData("london");
