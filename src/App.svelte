<script>
    import ForecastList from './components/ForecastList.svelte';
    import CurrentWeather from './components/CurrentWeather.svelte';
    import './styles.css'
    import {onMount} from "svelte";
    import {fetchWeather} from './utils/weatherApi.js';

    let city = 'Moscow';
    let weatherData, forecastData, forecastDataNextDay;
    let loading = true;

    onMount(async () => {
        loading = true;
        try {
            weatherData = await fetchWeather(city);
            forecastData = weatherData.weather[0];
            forecastDataNextDay = weatherData.weather[1];
        } catch (error) {
            console.error('Error fetching weather:', error);
        } finally {
            loading = false;
        }
    });

</script>

<main>
    <h1>Weather in {city}</h1>
    {#if loading}
        <p>Loading...</p>
    {:else}
        <div class="container">
            <span class="current">
                <CurrentWeather {weatherData} />
            </span>
            <span class="current">
                <ForecastList {forecastData} />
            </span>
            <span class="current">
                <ForecastList forecastData={forecastDataNextDay} />
            </span>
        </div>
    {/if}
</main>