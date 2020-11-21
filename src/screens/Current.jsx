import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCurrent } from "../js/api_helper";

export default function Current(props) {
  const { location } = useParams();
  const cityName = location || props.city || "Cairo";
  const [locationData, setLocationData] = useState({});
  const [currentData, setCurrentData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getCurrent(cityName)
      .then((resp) => {
        setCurrentData(resp["current"]);
        setLocationData(resp.location);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [cityName]);

  return (
    <>
      {isLoaded ? (
        <div className="mid-container">
          <div className="info-card">
            <img
              className="icon"
              src={currentData.condition.icon}
              alt="Weather icon"
            />
            <p className="temp">
              {currentData.temp_c}
              <sup>o</sup>
            </p>
            <p className="small-info">{currentData.condition.text}</p>
            <p className="small-info">
              Feels like {parseInt(currentData.feelslike_c)}
              <sup>o</sup> in {locationData.name}, {locationData.country}
            </p>
          </div>

          <div className="details">
            <div className="line">
              <p>Wind Speed</p>
              <p className="end">{parseInt(currentData.wind_kph)} KPH</p>
            </div>
            <div className="line">
              <p>Wind Degree</p>
              <p className="end">{parseInt(currentData.wind_degree)}</p>
            </div>
            <div className="line">
              <p>Wind Direction</p>
              <p className="end">{currentData.wind_dir}</p>
            </div>
            <div className="line">
              <p>Humidity</p>
              <p className="end">{currentData.humidity} %</p>
            </div>
            <div className="line">
              <p>UV index</p>
              <p className="end">{parseInt(currentData.uv)}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mid-container">
          <div className="small-info">Loading ...</div>
        </div>
      )}
    </>
  );
}
