import React from "react";
import "./index.scss";

const index = ({ img, alt }) => {
  return (
    <figure>
      <img src={img} alt={alt} />
    </figure>
  );
};

export default index;
