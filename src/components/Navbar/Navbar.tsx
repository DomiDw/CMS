import React, { Component } from "react";
import "./navbar.scss";

export class Navbar extends Component {
  getClubIdFromUrl() {
    const url = window.location.href;
    const parts = url.split("/");
    for (let i = 0; i < parts.length; i++) {
      return parts[4].length > 0 ? parts[4] : null;
    }
  }

  backToPage: string =
    "https://europe-west1-sw-sc-de-dev.cloudfunctions.net/aisw-cms-clubpage/" +
    this.getClubIdFromUrl();

  render() {
    return (
      <div className="navbar">
        <button>
          <a className="navButton" href={this.backToPage} target="blank">
            Zurück
          </a>
        </button>
      </div>
    );
  }
}
