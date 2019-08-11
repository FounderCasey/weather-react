import React from "react";
import { geolocated } from "react-geolocated";
import axios from "axios";

class GeoLocation extends React.Component {
  gotCoords = false;
  country = ""
  state = {
    weather: {}
  }
  // dj0yJmk9N0RuTTRmdk5pUEdXJmQ9WVdrOU1YQkpORWx5TjJrbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTJh - Client ID
  // 0a8a8f0115b5cf309ca80795cc47c3d06d18e016 - Secret

  componentDidUpdate() {
    // axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.props.coords.latitude}&lon=${this.props.coords.longitude}&appid=2d1b182ac5b3281d131a784daf7650dd`)
    //   .then(res => {
    //     const weather = res.data;
    //     this.setState({ weather });
    //   })
    if (this.props.isGeolocationAvailable && !this.gotCoords) {
      console.log(this.props.coords);
      if (this.props.coords !== null) {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.props.coords.latitude}&lon=${this.props.coords.longitude}&appid=997969ab33d6a605da62ceaafabcf644`)
          .then(res => {
            const weather = res.data;
            this.setState({ weather });
            console.log(weather)
            this.country = this.state.weather.sys.country;
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
        {this.state.weather.name}
        {this.country}
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