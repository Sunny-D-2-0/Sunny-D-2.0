import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import BigButton from "./BigButton.jsx";
import WeatherDisplay from "./WeatherDisplay.jsx";

function Home(props) {
  // const location = useLocation();
  // console.log(location)

  const [temp, updateTemp] = useState(0);
  const [uv, updateUv] = useState(0);
  const [condition, updateCondition] = useState("");
  const [city, updateCity] = useState("");
  const [region, updateRegion] = useState("");
  const [zipcode, setZipcode] = useState('');
  

  function handleClick() {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=3b98cf2d582f413d83c172329232503&q=${zipcode}`
    )
      .then((res) => res.json())
      .then((res) => {
        updateTemp(res.current.temp_f);
        updateUv(res.current.uv);
        updateCondition(res.current.condition.icon);
        updateCity(res.location.name);
        updateRegion(res.location.region);
      })
      .catch((err) => {
        console.log("Error in weather api call: ", err);
      });
  };

  return (
    <div id="home-page">
      <div id="content">
        <div>
          <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
          <button onClick={handleClick}>Get location data</button>
        </div>
        <div>
          <h1>{`Hello, ${props.displayName}!`}</h1>
          <div id="city">
            {city}, {region}
          </div>

          <WeatherDisplay
            zipcodeEntry={zipcode}
            temp={temp}
            uv={uv}
            condition={condition}
            city={city.toUpperCase()}
            region={region.toUpperCase()}
          />
        </div>

        <BigButton uv={uv} username={props.username} user={props.user} />
      </div>
    </div>
  );
}

export default Home;

// http://api.weatherapi.com/v1/current.json?key=3b98cf2d582f413d83c172329232503&q=

// {
//     "location": {
//         "name": "Seoul",
//         "region": "",
//         "country": "South Korea",
//         "lat": 37.57,
//         "lon": 127.0,
//         "tz_id": "Asia/Seoul",
//         "localtime_epoch": 1679766164,
//         "localtime": "2023-03-26 2:42"
//     },
//     "current": {
//         "last_updated_epoch": 1679765400,
//         "last_updated": "2023-03-26 02:30",
//         "temp_c": 10.0,
//         "temp_f": 50.0,
//         "is_day": 0,
//         "condition": {
//             "text": "Partly cloudy",
//             "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
//             "code": 1003
//         },
//         "wind_mph": 2.2,
//         "wind_kph": 3.6,
//         "wind_degree": 320,
//         "wind_dir": "NW",
//         "pressure_mb": 1017.0,
//         "pressure_in": 30.04,
//         "precip_mm": 0.0,
//         "precip_in": 0.0,
//         "humidity": 50,
//         "cloud": 75,
//         "feelslike_c": 8.9,
//         "feelslike_f": 48.0,
//         "vis_km": 10.0,
//         "vis_miles": 6.0,
//         "uv": 1.0,
//         "gust_mph": 7.2,
//         "gust_kph": 11.5
//     }
// }
