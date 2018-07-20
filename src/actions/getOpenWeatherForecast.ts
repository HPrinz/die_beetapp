import { OpenWeatherForecast } from "../reducers/weather";
import { weatherApiUrl, weatherApiKey } from "../config";
import { LatLng } from "react-native-maps";

export async function getOpenWeatherForecast(location: LatLng) {
    const url = `${weatherApiUrl}/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${weatherApiKey}`;

    try {
        let response = await fetch(url);

        let json = await response.json();

        return json as OpenWeatherForecast;

    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export default getOpenWeatherForecast;