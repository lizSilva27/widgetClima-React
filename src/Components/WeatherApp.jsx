import { useEffect, useState } from 'react';
import { WeatherForm } from './WeatherForm';
import { WeatherMaininfo } from './WeatherMaininfo';
import styles from '../Styles/weatherApp.module.css';
import { Loading } from './Loading';

function WeatherApp() {

	const [weather, setWeather] = useState(null);

	useEffect(()=>{
		loadInfo();
	}, []);

	useEffect(()=>{
		document.title = `Weather | ${weather?.location.name ?? ''}`;
	}, [weather]);

	async function loadInfo(city = 'London'){
		
		try {
			const request = await fetch(
				`${import.meta.env.VITE_APP_URL}&key=${import.meta.env.VITE_APP_KEY}&q=${city}`
				);

			const json = await request.json();

			setTimeout(()=>{
				setWeather(json);
			},2000);
	
			console.log(json);

		} catch (error) {

		}
	}

	function handleChangeCity(city) {
		setWeather(null);
		loadInfo(city);
	}

	return (
		<div className={styles.weatherContainer}>
			<WeatherForm onChangeCity={handleChangeCity} />
			{weather ? <WeatherMaininfo weather={weather} /> : <Loading/>}
		</div>
	);
}

export { WeatherApp }