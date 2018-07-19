
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

type OpenWeatherType = {
  main:
  {
    //Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit. 
    temp: number,
    //Humidity, %
    humidity: number,
    //Minimum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    temp_min: number,
    //Maximum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    temp_max: number
    clouds:
    {
      //Cloudiness, percent
      all: number,
    },
    rain:
    {
      //Rain volume for the last 3 hours
      "3h": number,
    },
    //Time of data calculation, unix, UTC 
    dt: number,
    sys: {
      //time, unix, UTC
      sunrise: number,
      //time, unix, UTC
      sunset: number,
    },
  }
};

export function getWeather(location: LatLng): GetWeatherActionResponse {
  const url = `${weatherApiUrl}/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${weatherApiKey}`;

  try {
    var openweather: OpenWeatherType;

    const request = async () => {
      const response = await fetch(url);
      const json = await response.json();

      console.log(json);

      openweather = json as OpenWeatherType;

      return {
        type: constants.GET_WEATHER,
        attributes: {
          weather: {
            temp: openweather.main.temp
          }
        }
      } as GetWeatherActionResponse;

    };

    return {
      type: constants.GET_WEATHER,
      attributes: {
        weather: {
          temp: 42
        }
      }
    } as GetWeatherActionResponse;

  }
  catch (error) {
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
