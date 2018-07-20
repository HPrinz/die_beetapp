
import { weatherApiIconUrl } from "../config";

export type OpenWeather = {
    //Time of data calculation, unix, UTC 
    dt: number,
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
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
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
    sys: {
        //time, unix, UTC
        sunrise: number,
        //time, unix, UTC
        sunset: number,
    },
};

export type OpenWeatherForecast = {
    list: OpenWeather[]
};

export interface WeatherModel {
    waether: OpenWeather,
    forecast: OpenWeatherForecast
}

export type BedWeatherReport = {
    temperatur: number,
    himmel: "SONNE" | "BEWÖLKT" | "REGEN" | "VIEL_REGEN",
};

export default class Weather implements WeatherModel {
    public waether: OpenWeather;
    public forecast: OpenWeatherForecast;

    constructor(waether: OpenWeather, forecast: OpenWeatherForecast) {
        this.waether = waether;
        this.forecast = forecast;
    }
}

export function getReport(waether: OpenWeather): BedWeatherReport {
    return {
        temperatur: waether.main.temp,
        himmel: getHimmel(waether)
    } as BedWeatherReport;
}

export function getHimmel(waether: OpenWeather): string {
    if (waether.clouds.all == 0) {
        return "SONNE";
    }
    if (waether.rain["3h"] == 0 && waether.clouds.all > 0) {
        return "BEWÖLKT";
    }

    if (waether.rain["3h"] == 0 && waether.clouds.all > 0) {
        return "BEWÖLKT";
    }

    return "";
}

export function getIcon(waether: Weather): string {
    return weatherApiIconUrl + waether.waether.weather[0].icon + ".png";
}



