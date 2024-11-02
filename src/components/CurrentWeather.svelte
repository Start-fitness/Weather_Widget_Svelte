<script>
    export let weatherData;
</script>

{#if weatherData && weatherData.current_condition && weatherData.current_condition.length > 0}
    <h2>Current</h2>
    <p>Temperature: <b>{weatherData.current_condition[0].temp_C}°C</b></p>
    <p>Feels like: <b>{weatherData.current_condition[0].FeelsLikeC} °C</b></p>
    <p>Wind speed: <b>{weatherData.current_condition[0].windspeedKmph} Kmph</b></p>
    <p>Pressure: <b>{weatherData.current_condition[0].pressureInches} Inches</b></p>
    <p>Visibility: <b>{weatherData.current_condition[0].visibilityMiles} Miles</b></p>
    <p>Conditions:
        <img src={weatherData.current_condition[0].weatherIconUrl[0].value} alt="Weather Icon">
        <b>{weatherData.current_condition[0].weatherDesc[0].value}</b>
    </p>
{/if}