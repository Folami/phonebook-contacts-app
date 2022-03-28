import React from "react";

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick} name={props.name}>
        {props.text}
      </button>
    </div>
  );
};

export default Button;
