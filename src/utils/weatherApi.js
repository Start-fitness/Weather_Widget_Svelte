const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_URL;

export async function fetchWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?key=${apiKey}&q=${city}&format=json`);
        const resJson = await response.json();
        return resJson.data;
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        throw error;
    }
}