import React from "react";
import "./index.scss";

const Index = ({ content, href, id }) => {
  return (
    <a href={href} id={id}>
      {content}
    </a>
  );
};

export default Index;
