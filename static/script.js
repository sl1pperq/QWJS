const KEY = "TOKEN"
fetch(`https://api64.ipify.org?format=json`)
    .then(response => response.json())
    .then(data => {
        fetch(`https://ipapi.co/${data.ip}/json/`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("info").innerText = `Your city is ${data.city}`
                city = data.city
                getWeather(city)
            })
            .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));

function getWeather(city) {
    setTimeout(() => {
        fetch(`https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}&aqi=yes&lang=ru`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                document.getElementById("spinner").style.display = "none"
                document.getElementById("card").style.display = "block"
                document.getElementById("weatherFind").style.display = "block"

                document.getElementById("temp").innerText = `${data.current.temp_c} °C`
                document.getElementById("info").innerText = `Сейчас в городе ${city} ${data.current.condition.text.toLowerCase()}`

                document.getElementById("time").innerText = `Время: ${data.location.localtime}`
                document.getElementById("feels").innerText = `Ощущается как: ${data.current.feelslike_c} °C`
                document.getElementById("humi").innerText = `Влажность: ${data.current.humidity}%`
                document.getElementById("uv").innerText = `У/Ф излучение: ${data.current.uv}`
                document.getElementById("visi").innerText = `Видимость: ${data.current.vis_km}`

                document.getElementById("co").innerText = `CO: ${data.current.air_quality.co}`
                document.getElementById("no2").innerText = `NO₂: ${data.current.air_quality.no2}`
                document.getElementById("o3").innerText = `O₃: ${data.current.air_quality.o3}`
                document.getElementById("pm25").innerText = `PM 2.5: ${data.current.air_quality.pm2_5}`
                document.getElementById("pm10").innerText = `PM 10: ${data.current.air_quality.pm10}`

                document.getElementById("country").innerText = `Страна: ${data.location.country}`
                document.getElementById("lat").innerText = `Широта: ${data.location.lat}`
                document.getElementById("lot").innerText = `Долгота: ${data.location.lon}`

                fetch(`https://api.weatherapi.com/v1/astronomy.json?key=${KEY}&q=${city}&lang=ru`)
                    .then(response => response.json())
                    .then(ast => {
                        document.getElementById("sunrise").innerText = `Восход: ${ast.astronomy.astro.sunrise}`
                        document.getElementById("sunset").innerText = `Закат: ${ast.astronomy.astro.sunset}`
                    })
                    .catch(error => console.error('Error:', error));
            })
            .catch(error => console.error('Error:', error));
    }, 1500)
}

document.getElementById("cityName").addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        findCityWeather()
    }
})

function findCityWeather() {
    var cityName = document.getElementById("cityName").value
    document.getElementById("spinner").style.display = "block"
    document.getElementById("card").style.display = "none"
    document.getElementById("weatherFind").style.display = "none"

    setTimeout(() => {
        fetch(`https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${cityName}&aqi=yes&lang=ru`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                document.getElementById("spinner").style.display = "none"
                document.getElementById("card").style.display = "block"
                document.getElementById("weatherFind").style.display = "block"

                document.getElementById("city")
                document.getElementById("temp").innerText = `${data.current.temp_c} °C`
                document.getElementById("info").innerText = `Сейчас в городе ${cityName} ${data.current.condition.text.toLowerCase()}`

                document.getElementById("time").innerText = `Время: ${data.location.localtime}`
                document.getElementById("feels").innerText = `Ощущается как: ${data.current.feelslike_c} °C`
                document.getElementById("humi").innerText = `Влажность: ${data.current.humidity}%`
                document.getElementById("uv").innerText = `У/Ф излучение: ${data.current.uv}`
                document.getElementById("visi").innerText = `Видимость: ${data.current.vis_km}`

                document.getElementById("co").innerText = `CO: ${data.current.air_quality.co}`
                document.getElementById("no2").innerText = `NO₂: ${data.current.air_quality.no2}`
                document.getElementById("o3").innerText = `O₃: ${data.current.air_quality.o3}`
                document.getElementById("pm25").innerText = `PM 2.5: ${data.current.air_quality.pm2_5}`
                document.getElementById("pm10").innerText = `PM 10: ${data.current.air_quality.pm10}`

                document.getElementById("country").innerText = `Страна: ${data.location.country}`
                document.getElementById("lat").innerText = `Широта: ${data.location.lat}`
                document.getElementById("lot").innerText = `Долгота: ${data.location.lon}`

                fetch(`https://api.weatherapi.com/v1/astronomy.json?key=${KEY}&q=${city}&lang=ru`)
                    .then(response => response.json())
                    .then(ast => {
                        document.getElementById("sunrise").innerText = `Восход: ${ast.astronomy.astro.sunrise}`
                        document.getElementById("sunset").innerText = `Закат: ${ast.astronomy.astro.sunset}`
                    })
                    .catch(error => console.error('Error:', error));
            })
            .catch(error => console.error('Error:', error));
    }, 1500)
}