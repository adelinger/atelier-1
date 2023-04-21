import React from "react";
import PropTypes from "prop-types";

const Alert = ({color, message}) => {
  
  return (
    <>
      
        <div
          className={"text-white px-6 py-4 border-0 rounded relative mb-4"+" bg-"+color+"-500"}
        >
          <span className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-bell" />
          </span>
          <span className="inline-block align-middle mr-8">
            <p className="capitalize">{color==='emerald' ? ' ' : '   Error '}</p>{message}
          </span>
        </div>
    
    </>
  );
};

Alert.defaultProps = {
    color: "emerald",
  };
  
  Alert.propTypes = {
    color: PropTypes.oneOf(["emerald", "red", "amber"]),
  };

export default Alert;