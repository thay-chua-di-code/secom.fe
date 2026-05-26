import React from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();
  
  return <h1>Hello World</h1>;
};

export default DetailPage;
