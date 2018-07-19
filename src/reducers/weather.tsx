export interface WeatherModel {
    temp: number,
    temp_min: number,
    temp_max: number
}

/*
location: string,
    forecast: any,
    feelsLike: any,
    current: any,
    low: string,
    high: string,
    icon: string
*/

export default class Weather implements WeatherModel {
    public temp: number = 0;
    public temp_min: number = 0;
    public temp_max: number = 0;

    public toJson(): WeatherModel {
        return {
            temp: this.temp,
            temp_min: this.temp_min,
            temp_max: this.temp_max
        };
    }

    public tempAverage(): number {
        return 0;
    }
}
