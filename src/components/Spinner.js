import React, { Component } from "react";
import loadingCircle from "./loadingCircle.gif";
// import loading from "./loading.gif";

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={loadingCircle} alt="Loading" width={200} />
      </div>
    );
  }
}
