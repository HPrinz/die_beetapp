import { weatherApiUrl, weatherApiKey } from "../config";
import { LatLng } from "react-native-maps";
import { OtherActionResponse } from ".";
import Weather from "../reducers/weather";

export type GetWeatherActionResponse = {
  location: string,
  forecast: any,
  feelsLike: any,
  current: any,
  low: string,
  high: string,
  icon: string
};

export type LocationActionResponse = GetWeatherActionResponse | OtherActionResponse;

export type GetWeatherAction = (location: string) => GetWeatherActionResponse;

export async function getWeather(location: LatLng) {
  const url = `${weatherApiUrl}/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${weatherApiKey}`;

  try {
    let response = await fetch(url);

    let json = await response.json();

    let openweather = json as OpenWeather;

    return {
      temp: openweather.main.temp
    } as Weather;

  } catch (error) {
    console.log(error);
    return {
      temp: 0
    } as Weather;
  }
}



export default getWeather;
