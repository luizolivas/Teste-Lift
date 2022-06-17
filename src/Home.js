import React from "react";
import ListaPedido from "./ListaPedido";

const Home = (props) => {
  console.log(props);
  return (
    <>
      <ListaPedido {...props} />
    </>
  );
};

export default Home;