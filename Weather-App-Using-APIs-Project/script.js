let weather = {
    "apiKey": "f78926488aadbef05827202d51d8f2a7",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&appid=" 
            + this.apiKey
            + "&units=imperial"
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity} = data.main;
        const { speed } = data.wind;
        // const roundedTemp = Math.floor(temp);
        document.querySelector(".city").innerText = "Weather in: "+ name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " MPH";
        document.querySelector(".weather").classList.remove("loading");
        setTimeout(function(){
            document.body.style.backgroundImage = "none";
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name +"')"; 
        }, 100);
        
        document.body.classList.add("fade-in");
    },
    search: function () {
        const searchValue = document.querySelector(".search-bar");
        this.fetchWeather(searchValue.value);
    }
};

const btn = document.querySelector(".btn");

btn.addEventListener("click", function() {
        weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Denver");