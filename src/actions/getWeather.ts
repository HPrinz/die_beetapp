import { OtherActionResponse } from "./action.type";
import { weatherApiUrl, weatherApiKey } from "../config";

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

export async function getWeather(lat: number, lon :number) {
    const url = `${weatherApiUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`;
    
    try {
      let response = await fetch(url);

      return await response.json();

      // return {
      //   location: result.name,
      //   forecast: result.weather[0].main,
      //   feelsLike: (result.main.temp_min | 0),
      //   current: (result.main.temp | 0),
      // };
    } catch(error) {
      console.log(error);
      return {
        location: '',
        forecast: '',
        feelsLike: '',
        current: '',
        low: '',
        high: '',
        icon: ''
      };
    }
}



export default getWeather;
