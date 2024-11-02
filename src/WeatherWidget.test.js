import ForecastList from './components/ForecastList.svelte';
import CurrentWeather from './components/CurrentWeather.svelte';
import App from './App.svelte'
import { render, screen} from '@testing-library/svelte'
import { formatTime } from './utils/formatTime';
import '@testing-library/jest-dom';

test('displays hourly forecast data correctly', () => {
    render(ForecastList, {
        forecastData: {
            date: '2024-11-02',
            hourly: [
                {
                    time: 300,
                    tempC: 10,
                    FeelsLikeC: 8,
                    windspeedKmph: 15,
                    pressureInches: 30,
                    visibilityMiles: 10,
                    weatherIconUrl: [{ value: 'icon_url' }],
                    weatherDesc: [{ value: 'Clear' }]
                }
            ]
        }
    });
    expect(screen.queryByText('2024-11-02')).not.toBeNull();
    expect(screen.queryByText('03:00')).not.toBeNull();
    expect(screen.queryByText('10°C')).not.toBeNull();
    expect(screen.queryByText('Clear')).not.toBeNull();
});
test('formats time correctly', () => {
    expect(formatTime(300)).toBe('03:00');
    expect(formatTime(1230)).toBe('12:30');
});
test('does not render anything if weatherData is empty', () => {
    render(CurrentWeather, { weatherData: {} });
    expect(screen.queryByText('Current')).toBeNull();
});
test('renders current weather data correctly', () => {
    const mockWeatherData = {
        current_condition: [
            {
                temp_C: 20,
                FeelsLikeC: 18,
                windspeedKmph: 10,
                pressureInches: 30,
                visibilityMiles: 5,
                weatherIconUrl: [{ value: 'icon_url' }],
                weatherDesc: [{ value: 'Sunny' }],
            },
        ],
    };

    render(CurrentWeather, { weatherData: mockWeatherData });

    expect(screen.getByText('Temperature:')).toHaveTextContent('20°C');
    expect(screen.getByText('Feels like:')).toHaveTextContent('18 °C');
    expect(screen.getByText('Wind speed:')).toHaveTextContent('10 Kmph');
    expect(screen.getByText('Pressure:')).toHaveTextContent('30 Inches');
    expect(screen.getByText('Visibility:')).toHaveTextContent('5 Miles');
    expect(screen.getByText('Conditions:')).toHaveTextContent('Sunny');
});
beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: async () => ({
                data: {
                    weather: [
                        {
                            current_condition: [
                                {
                                    temp_C: 20,
                                    FeelsLikeC: 18,
                                    windspeedKmph: 10,
                                    pressureInches: 30,
                                    visibilityMiles: 5,
                                    weatherIconUrl: [{ value: 'icon_url' }],
                                    weatherDesc: [{ value: 'Sunny' }],
                                },
                            ],
                        },
                        {
                            hourly: [
                                { time: 300, tempC: 20, FeelsLikeC: 18, windspeedKmph: 10, pressureInches: 30, visibilityMiles: 5, weatherIconUrl: [{ value: 'icon_url' }], weatherDesc: [{ value: 'Sunny' }] },
                            ],
                        },
                    ],
                },
            }),
        })
    );
});
afterEach(() => {
    jest.resetAllMocks();
});
test('displays loading state initially', async () => {
    render(App);
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
});
test('displays city weather forecast title', async () => {
    render(App);
    const title = await screen.findByText(/Weather in/i);
    expect(title).toBeInTheDocument();
});
test('renders CurrentWeather and ForecastList correctly', async () => {
    render(App);

    expect(await screen.findByText((content) => content.includes('T:'))).toBeInTheDocument();
    expect(await screen.findByText((content) => content.includes('F:'))).toBeInTheDocument();
});