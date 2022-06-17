import React from "react";
import "./styles.css";
import Home from "./Home";
import InfoPedido from "./InfoPedido";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// var requestOptions = {
//   method: 'GET',
//   redirect: 'follow'

// };



export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/informacaoPedido" component={InfoPedido}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
