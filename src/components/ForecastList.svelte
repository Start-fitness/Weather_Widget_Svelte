<script>
    import './ForecastList.css';
    import { formatTime } from '../utils/formatTime';
    export let forecastData;
</script>

{#if forecastData && forecastData.hourly && Array.isArray(forecastData.hourly)}
    <ul>
        <h2>{forecastData.date}</h2>
        {#each forecastData.hourly as hour}
            <li>
                <b>{formatTime(hour.time)}</b> T: <b>{hour.tempC}°C</b>, F: <b>{hour.FeelsLikeC} °C</b>,
                W: <b>{hour.windspeedKmph} Kmph</b>, P: <b>{hour.pressureInches} Inches</b>,
                V: <b>{hour.visibilityMiles} Miles</b>,
                C: <img src={hour.weatherIconUrl[0].value} alt="Weather Icon"> <b>{hour.weatherDesc[0].value}</b>
            </li>
        {/each}
    </ul>
{/if}