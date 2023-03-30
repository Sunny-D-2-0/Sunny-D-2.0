import React, { useState, useEffect } from "react";
import BigButton from "./BigButton.jsx";
import WeatherDisplay from "./WeatherDisplay.jsx";

function Home(props) {

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
      setZipcode('');
  };

  async function getLocation() {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
    let lat = position.coords.latitude;
	  let long = position.coords.longitude;
    console.log("lat and long are", lat, long);
    const latlong = `${lat},${long}`
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=3b98cf2d582f413d83c172329232503&q=${latlong}`
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
  }

  return (
    <div id="home-page">
      <div id="content">
        <div className="location-form">
          <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
          <button className="get-location-button" onClick={handleClick}>Get location data</button>
          <button className="get-location-button" onClick={getLocation}>Use my location</button>
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
