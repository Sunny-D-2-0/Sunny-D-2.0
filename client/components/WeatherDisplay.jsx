import React from "react";

function WeatherDisplay(props) {
  return (
    <div id="weatherDisplay">
      <div className="dataCard">
        <div className="data-card-title">Temp: </div>
          <p style={{"fontSize": "26px"}}>{props.temp}°F</p>
      </div>
        <div className="dataCard">
          <div className="data-card-title">Condition: </div>
          <p
            style={{
              "backgroundImage": `url(${props.condition})`,
              "backgroundSize": "100% 100%",
              "height": "62px",
              "width": "62px", "margin": "0", "padding": "20px 0"
            }}
          ></p>
        </div>
        <div className="dataCard">
          <div className="data-card-title">UV Index: </div>
          <p style={{"fontSize": "26px"}}>{props.uv}</p>
        </div>
      </div>
  );
}

export default WeatherDisplay;
