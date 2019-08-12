import React from "react";
import { geolocated } from "react-geolocated";
import axios from "axios";
import "../styles/component.css";

class GeoLocation extends React.Component {
  gotCoords = false;
  state = {
    weather: {},
    country: ""
  }

  componentDidUpdate() {
    if (this.props.isGeolocationAvailable && !this.gotCoords) {
      if (this.props.coords !== null) {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.props.coords.latitude}&lon=${this.props.coords.longitude}&appid=997969ab33d6a605da62ceaafabcf644`)
          .then(res => {
            const weather = res.data;
            console.log(weather)
            this.setState({ weather: weather, country: weather.sys.country });
            console.log(this.state)
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
      <div>
        <h1>{this.state.weather.name}</h1>
        <h1 className="weight-light small-font">{this.state.country}</h1>
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
})(GeoLocation);