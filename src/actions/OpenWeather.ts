type OpenWeather = {
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

type OpenWeatherForecast = {
    list: {
        main: OpenWeather
    }[]

};