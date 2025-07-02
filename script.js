const search = document.getElementById("search");
const locationelement = document.querySelector(".locationname");
const DAY = document.querySelector(".Day");
const dateElement = document.querySelector(".Date");
const weathericon = document.querySelector(".weathericon");
const temprature = document.querySelector(".temprature");
const mintemprature = document.querySelector(".min-temprature");
const weathercondition = document.querySelector(".weathercondition");
const feelslike = document.querySelector(".feelslike");
const windspeed = document.querySelector(".windspeed");
const currenttime = document.querySelector(".time");
const uvindex = document.querySelector(".uvindex");
const uvstatus = document.querySelector(".uvstatus");
const humidity = document.querySelector(".humidity");
const humiditystatus = document.querySelector(".humiditystatus");
const visibility = document.querySelector(".visible-distance");
const visibilitystatus = document.querySelector(".visibilitystatus");
const sunrise = document.querySelector(".sunrise-time");
const sunset = document.querySelector(".sunset-time");
const aqilevel = document.querySelector(".aqilevel");
const aqivalue = document.querySelector(".aqivalue");
const aqibox = document.querySelector(".aqibox");
const advicecontent = document.querySelector(".advicecontent");
const forecastday = document.querySelectorAll('.day')
const weatherimg =  document.querySelectorAll('.weather-img')
const forecasttemp =  document.querySelectorAll('.day-temprature')
const rainchances = document.querySelector(".rain-chances")
const searchbtn = document.querySelector(".searchbtn")
// fetch api -->
 search.value = "India"

async function weatherdetails(city) {
  

  let weather = await fetch(
    `/api/weather?city=${city}`
  );
  let data = await weather.json();
  locationelement.innerHTML = data.location
    ? data.location.name +
      "," +
      data.location.region +
      "," +
      data.location.country
    : "Location not found";

  // weather icon in content1 -->

    weathericon.src = data.current.condition.icon;

    // temprature in content 1

    temprature.innerHTML = data.current.temp_c + "°";
    mintemprature.innerHTML =
      "/" + data.forecast.forecastday[0].day.mintemp_c + "°";

    // weathercondition in content1 -->

    weathercondition.innerHTML = data.current.condition.text;

    //  feels like in content1

    feelslike.innerHTML = "Feels like " + data.current.feelslike_c + "°";

    //rain chance in content1 --> 

    rainchances.textContent = data.forecast.forecastday[0].day.daily_chance_of_rain + "%"
    // VALUES IN CONTENT 2 WILL START HERE -->

    // windspeed in content 2 -->

    windspeed.innerHTML = data.current.wind_kph + " km/hr";

    // uv index and uv status in content 2 -->

    uvindex.textContent = data.current.uv + " UV";

    if (data.current.uv <= 2) {
      uvstatus.textContent = "Low UV";
    } else if (data.current.uv <= 4) {
      uvstatus.textContent = "Moderate UV";
    } else if (data.current.uv <= 7) {
      uvstatus.textContent = "High UV";
    } else if (data.current.uv <= 10) {
      uvstatus.textContent = "Very High UV";
    } else {
      uvstatus.textContent = "Extreme UV";
    }

    // humidity and humidity status in content2 -- >

    humidity.textContent = data.current.humidity + "%";

    if (data.current.humidity <= 30) {
      humiditystatus.textContent = "Too dry";
    } else if (data.current.humidity <= 60) {
      humiditystatus.textContent = "Optimal";
    } else if (data.current.humidity <= 90) {
      humiditystatus.textContent = "Too Humid";
    } else {
      humiditystatus.textContent = "Very High Humidity";
    }

    // visibility and visibilitystatus is content 2 -->

    visibility.textContent = data.current.vis_km + "km";

    if (data.current.vis_km <= 0.2) {
      visibilitystatus.textContent = "Thick Fog";
    } else if (data.current.vis_km <= 0.7) {
      visibilitystatus.textContent = "Moderate Fog";
    } else if (data.current.vis_km <= 1) {
      visibilitystatus.textContent = "Light Fog";
    } else if (data.current.vis_km <= 2) {
      visibilitystatus.textContent = "Thin Fog/Heavy Rain";
    } else if (data.current.vis_km <= 4) {
      visibilitystatus.textContent = "Haze/Medium Rain";
    } else if (data.current.vis_km <= 10) {
      visibilitystatus.textContent = "Light Haze/Light Rain";
    } else if (data.current.vis_km <= 20) {
      visibilitystatus.textContent = "Clear/Drizzle";
    } else if (data.current.vis_km <= 50) {
      visibilitystatus.textContent = "Very Clear";
    } else {
      visibilitystatus.textContent = "Very High Humidity";
    }

    // sunrise and sunser in content 2 -->

    sunrise.textContent = data.forecast.forecastday[0].astro.sunrise;

    sunset.textContent = data.forecast.forecastday[0].astro.sunset;

    // VALUES IN CONTENT 3 WILL START HERE -->

    aqilevel.textContent = Math.floor(data.current.air_quality["us-epa-index"]);

    const aqiIndex = data.current.air_quality["us-epa-index"];
    const aqiLevels = [
      {
        label: "Good",
        color: "green",
        advice: "Air quality is satisfactory. No risk.",
      },
      {
        label: "Moderate",
        color: "yellow",
        advice:
          "Acceptable air sensitive individuals should limit prolonged exposure.",
      },
      {
        label: "Sensitive-risk",
        color: "orange",
        advice:
          "Sensitive groups (asthmatics, elderly, children) may experience health effects. General public not likely affected.",
      },
      {
        label: "Unhealthy",
        color: "red",
        advice:
          "Everyone may begin to experience health effects. Sensitive groups may have more serious symptoms.",
      },
      {
        label: "Very Unhealthy",
        color: "#af52de",
        advice:
          "Health alert: Everyone may experience serious health effects. Limit outdoor activities.",
      },
      {
        label: "Hazardous",
        color: "#800000",
        advice:
          "Emergency conditions. Entire population is at risk. Avoid all outdoor activity. Consider evacuation if advised by authorities.",
      },
    ];
    const aqi = aqiLevels[aqiIndex - 1];
    if (aqi) {
      aqivalue.textContent = aqi.label;
      aqibox.style.backgroundColor = aqi.color;
      advicecontent.innerHTML = aqi.advice;
    } else {
      aqivalue.textContent = "Unknown";
      aqibox.style.backgroundColor = "#888";
      advicecontent.innerHTML = "AQI data not available or out of range.";
    }

    // VALUES IN CONTENT 4 -->

    // days in content 4 --> 

    forecastday.forEach( (element , i) => {
    element.textContent = days[(time.getDay() + i) % 7]
    element.textContent = element.textContent.slice(0 , 3)
 });

      // weather image in content 4 --> 

     weatherimg.forEach((element , i) => {
      if (data.forecast.forecastday[i]) {
        element.src = data.forecast.forecastday[i].day.condition.icon;
      } else {
        element.src = ""; // or a placeholder image
      }
     });

    //  temprature in content 4

    forecasttemp.forEach((element , i) => {
      if (data.forecast.forecastday[i]) {
        element.textContent = data.forecast.forecastday[i].day.maxtemp_c + "/" + data.forecast.forecastday[i].day.mintemp_c;
      } else {
        element.textContent = "";
      }
    });
}

weatherdetails();



// day finder -->

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const time = new Date();
let dayname = days[time.getDay()];

DAY.innerHTML = dayname;



// date finder -- >

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const date = time.getDate();
const month = time.getMonth();
const year = time.getFullYear();
let monthname = months[time.getMonth()];

dateElement.innerHTML = `${date} ${monthname} ${year}`;

// time under windspeed in content2 -->

const hour = time.getHours();
const minutes = time.getMinutes();
let displayHour = hour % 12 === 0 ? 12 : hour % 12;
let ampm = hour < 12 ? "AM" : "PM";
currenttime.textContent = `${displayHour}:${minutes
  .toString()
  .padStart(2, "0")} ${ampm}`;

// input handler -->

document.addEventListener("keydown", async (event) => {
  if (event.key === "Enter" || "g") {
         weatherdetails(search.value)
  }
});

searchbtn.addEventListener("click" , ()=>{
  weatherdetails(search.value)
});

weatherdetails("India")


const menubtn = document.querySelector(".menu-btn");
const aside = document.getElementsByTagName("aside");
if (menubtn && aside.length > 0) {
  menubtn.addEventListener("click", () => {
    aside[0].style.display = aside[0].style.display === "block" ? "none" : "block";
  });

}
