import React from "react";
import "./styles.css";
import Home from "./Home";
import InfoPedido from "./InfoPedido";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/pedido/:id" component={InfoPedido}></Route>
          <Route path="/" exact component={Home}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
