import React from "react";
import "./Spinner.scss";

const Spinner = ({ initial }) => {
  return (
    <div className={`loadingSpinner ${initial ? "initial" : ""}`}>
      <div className="spinner" >
      <div className="spinner"></div>
      </div>
    </div>
  );
};

export default Spinner;
