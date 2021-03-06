
import { weatherApiIconUrl } from "../config";
import { NumericDictionary } from "../../node_modules/@types/lodash";
import { Moment } from 'moment'

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
    now: OpenWeather,
    forecast: OpenWeatherForecast
}

//https://openweathermap.org/weather-conditions
export enum WeatherCondition {
    Unkown = 0,
    //Thunderstorm 
    /// ...
    // Drizzle
    //...
    //Rain
    LightRain = 500,
    ModerateRain = 501,
    HeavyIntensityRain = 502,
    VeryHeavyRain = 503,
    ExtremeRain = 504,
    FreezingRain = 511,
    LightIntensityShowerRain = 520,
    ShowerRain = 521,
    HeavyIntensityShowerRain = 522,
    RaggedShowerRain = 531,
    //Snow
    // ...
    //Atmosphere
    //...
    //Clear
    ClearSky = 800,
    //Clouds
    FewClouds = 801,
    ScatteredClouds = 802,
    BrokenClouds = 803,
    OvercastClouds = 804
}

export default class Weather implements WeatherModel {
    public now: OpenWeather;
    public forecast: OpenWeatherForecast;

    constructor(now: OpenWeather, forecast: OpenWeatherForecast) {
        this.now = now;
        this.forecast = forecast;
    }
}

export function getCondition(weather: OpenWeather | undefined): WeatherCondition {
    if (!weather) return WeatherCondition.Unkown;
    return weather.weather[0].id as WeatherCondition;
}

export function getRainTotalAmount(weather: Weather | undefined, days: number): number {
    // var nowString = now.format("DD-MM-YYYY HH:mm:ss");    
    // var dateTimeString = moment.unix(weather.now.dt).format("DD-MM-YYYY HH:mm:ss");
    // console.log(nowString + ":" + weather.now.dt + " - " + dateTimeString);
    
    var rainAmount: number = 0.0;
    if (!weather)return rainAmount;
    if (!weather.forecast) return rainAmount;
    if (!weather.forecast.list) return rainAmount;
    
    var moment = require('moment');
    var now = moment(new Date());
    weather.forecast.list.filter((forecast : OpenWeather) => {
        return moment.unix(forecast.dt).diff(now, 'days') <= days
    }).forEach(forecast => {
        let rain = getRain(forecast);
        if (rain) {
            //console.log(rain);
            rainAmount = rainAmount + rain;
        } 
    });

    return rainAmount;
}

export function getSunHours(weather: Weather | undefined, days: number): number {
    
    var sunAmount: number = 0;
    if (!weather)return sunAmount;
    if (!weather.forecast) return sunAmount;
    if (!weather.forecast.list) return sunAmount;

    var moment = require('moment');
    var now = moment(new Date());

    weather.forecast.list.filter((forecast : OpenWeather) => {
        return moment.unix(forecast.dt).diff(now, 'days') <= days &&
        moment.unix(forecast.dt).isAfter(moment.unix(forecast.sys.sunrise)) && 
        moment.unix(forecast.dt).isBefore(moment.unix(forecast.sys.sunset));
    }).forEach(forecast => {
        // * 3 for three hours 
        let sunHours = (getSun(forecast) * 3) / 100;
        sunAmount += sunHours;
    });
    console.log(sunAmount);

    return sunAmount;
}

export function getRain(weather: OpenWeather | undefined): number {
    if (!weather)return 0;
    if (!weather.rain) return 0;
    if (!weather.rain["3h"]) return 0;

    return weather.rain["3h"];
}

export function getSun(weather: OpenWeather | undefined): number {
    if (!weather)return 0;
    if (!weather.clouds) return 0;
    if (!weather.clouds.all) return 0;

    return 100 - weather.clouds.all;
}

export function getRainAsString(weather: OpenWeather | undefined): string {
    const rain = getRain(weather)
    if (rain === 0.0) return '';
    if (rain < 0.5) return '<0.5mm';
    return Math.round(rain * 10) / 10 + 'mm';
}

export function getConditionIcon(weather: OpenWeather | undefined): string {
    if (weather == undefined) {
        return "";
    }
    return weatherApiIconUrl + weather.weather[0].icon + ".png";
}

export function getDateString(weather: OpenWeather | undefined): string {
    if (!weather) {
        return "";
    }
    var moment = require('moment');
    return moment.unix(weather.dt).format("DD-MM-YYYY HH:mm:ss");
}
