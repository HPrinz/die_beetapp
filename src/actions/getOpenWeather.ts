import { weatherApiUrl, weatherApiKey } from "../config";
import { LatLng } from "react-native-maps";
import { OpenWeather } from "../reducers/weather";

export async function getOpenWeather(location: LatLng) {
  const url = `${weatherApiUrl}/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${weatherApiKey}`;

  try {
    let response = await fetch(url);

    let json = await response.json();

    return json as OpenWeather;

  } catch (error) {
    console.log(error);
    return undefined;
  }
}
export default getOpenWeather;

