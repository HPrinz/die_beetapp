
import { weatherApiUrl, weatherApiKey } from "../config";
import * as constants from "../constants";
import Weather from "../reducers/weather";
import { LatLng } from "react-native-maps";
import { OtherActionResponse } from ".";

export interface GetWeatherActionResponse {
  type: constants.GET_WEATHER,
  attributes: {
    weather: Weather
  }
};

export type LocationActionResponse = GetWeatherActionResponse | OtherActionResponse;

export type GetWeatherAction = (location: string) => GetWeatherActionResponse;

export function getWeather(): GetWeatherActionResponse {
  const url = `${weatherApiUrl}/weather?lat=${100}&lon=${100}&units=metric&appid=${weatherApiKey}`;

  try {
    let response = fetch(url);

    return {
      type: constants.GET_WEATHER,
      attributes: {
        weather: {
          temp_max: 10,
        }
      }
    } as GetWeatherActionResponse;

    // return {
    //   location: result.name,
    //   forecast: result.weather[0].main,
    //   feelsLike: (result.main.temp_min | 0),
    //   current: (result.main.temp | 0),
    // };
  } catch (error) {
    console.log(error);
    return {
      type: constants.GET_WEATHER,
      attributes: {
        weather: {
        }
      }
    } as GetWeatherActionResponse;
  }
}



export default getWeather;
