import { useState, useEffect } from "react"

export const WeatherData = ({ city, submit }) => {

	const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
	const API_KEY = 'ffe6804c8a87c4ef8e83eb850ea4fd5d'
	const diffKelvin = 273.15
	const [data, setData] = useState(null)

	const fetchWeather = async() => {
		try {
			const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}`)
			const responseJSON = await response.json()
			responseJSON.cod === 200 ? setData(responseJSON) : console.log('Error: '+responseJSON.message)
		} catch (error) {
			console.error('Error: '+error)
		}
	}

	// Si useEffect() no tienen ninguna dependencia, se ejecuta cada vez que se renderiza el componente
	useEffect( () => {
		if(submit) fetchWeather()
	}, [submit])

	/*console.log(data);
	console.log(city);
	console.log(submit);*/

	return (
		data && data.cod === 200 && (
			<section>
				<h2>{data?.name}</h2>
				<h4>{parseInt(data?.main?.temp - diffKelvin)}ºC</h4>
				<img src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}/>
				<p>{data?.weather[0].description}</p>
			</section>
		)
	)
}
