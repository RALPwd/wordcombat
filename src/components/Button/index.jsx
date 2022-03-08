import React from "react";
import "./index.scss";

const Index = ({ name, type }) => {
  return <button type={type}>{name}</button>;
};

export default Index;
