import React, { Component } from "react";
import "../styles/component.css";
import Clock from 'react-live-clock';
import Geolocated from "./GeoLocation";

class Header extends Component {
  render() {
    return (
      <div className="header flexbox space-between">
        <div className="row">
          <h1>
            <Clock format={'h:mm'} ticking={true} timezone={'US/Pacific'}></Clock>
            <span className="weight-light small-font">
              <Clock format={'a'} ticking={true} timezone={'US/Pacific'}></Clock>
            </span></h1>
          <h1 className="weight-light small-font">08/10/2019</h1>
        </div>
        <div className="row">
          <h1 className="weight-light">
            <Geolocated></Geolocated>
          </h1>
        </div>
      </div>
    )
  }
}

export default Header;

