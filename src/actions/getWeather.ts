import { weatherApiUrl, weatherApiKey } from "../config";
import { LatLng } from "react-native-maps";
import Weather, { OpenWeather, OpenWeatherForecast } from "../reducers/weather";
import { getOpenWeather } from "./getOpenWeather";
import { getOpenWeatherForecast } from "./getOpenWeatherForecast";

export async function getWeather(location: LatLng) {
  let currentWeather = await getOpenWeather(location);
  let currentForecast = await getOpenWeatherForecast(location);

  try {

    if (currentWeather && currentForecast) {
      return {
        now: currentWeather as OpenWeather,
        forecast: currentForecast as OpenWeatherForecast,
      } as Weather;
    }


  } catch (error) {
    console.log(error);
    return {
    } as Weather;
  }
}
export default getWeather;



