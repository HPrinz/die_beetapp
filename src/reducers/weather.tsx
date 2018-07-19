export interface WeatherModel {
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
    public temp_min: number = 0;
    public temp_max: number = 0;

    constructor(temp_min: number = 0, temp_max: number = 0) {
        this.temp_min = temp_min;
        this.temp_max = temp_max;
    }

    public toJson(): WeatherModel {
        return {
            temp_min: this.temp_min,
            temp_max: this.temp_max
        };
    }

    public tempAverage(): number {
        return 0;
    }
}
