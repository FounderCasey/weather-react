import React, { Component } from "react";
import "../styles/info.css"
import { geolocated } from "react-geolocated";
import axios from "axios";

class Info extends Component {
  gotCoords = false;
  state = {
    weather: {},
    main: {},
    wind: {}
  }

  componentDidUpdate() {
    if (this.props.isGeolocationAvailable && !this.gotCoords) {
      if (this.props.coords !== null) {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.props.coords.latitude}&lon=${this.props.coords.longitude}&units=imperial&appid=997969ab33d6a605da62ceaafabcf644`)
          .then(res => {
            const weather = res.data;
            console.log(weather)
            this.setState({ weather: weather, main: weather.main, wind: weather.wind });
          })
        this.gotCoords = true;
      }
    }
  }

  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div className="container flexbox" >
        <div className="item">
          <div id="sun">
          </div>
          <h1>{this.state.main.temp}°</h1>
        </div>
        <div className="item">
          <h1>{this.state.main.temp_min}°</h1>
          <h1>{this.state.main.temp_max}°</h1>
        </div>
        <div className="item">
          <h1>{this.state.main.humidity}%</h1>
          <h1>Humidity</h1>
        </div>
        <div className="item">
          <h1>{this.state.wind.speed}mph</h1>
          <h1>Wind Speed</h1>
        </div>
      </div>
    ) : (
            <div>Getting the location data...</div >
          );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(Info);