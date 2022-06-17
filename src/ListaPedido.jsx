import {
  Table, TableBody, TableCell, TableHead,
  TableRow
} from "@material-ui/core";
import React from "react";
import "./styles.css";

export default class ListaPedido extends React.Component {
  constructor() {
    super();
    this.state = {
      clientes: []
    };
  }

  componentDidMount() {
    this.findClientes()
  }

  async findClientes() {
    var requestOptions = {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    };

    const response = await fetch("https://sistemalift1.com/lift_ps/api/clientes", requestOptions);
    const clientes = await response.json();
    console.log(clientes)
    debugger
    this.setState({ clientes });

  }


  handleRowClick() {
    this.props.history.push("/informacaoPedido");
  };

  render() {
    const { clientes } = this.state
    return (

      <div className="App" >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pedido</TableCell>
              <TableCell align="center">Cliente</TableCell>
              <TableCell align="center">Data</TableCell>
              <TableCell align="center">Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes && clientes.map((row) => (
              <TableRow key={row.id} onClick={this.handleRowClick}>
                <TableCell component="th" scope="row">
                  {clientes.indexOf(row) + 1}
                </TableCell>
                <TableCell align="center">{row.clienteName}</TableCell>
                <TableCell align="center">{row.clienteAddress}</TableCell>
                <TableCell align="center">{row.valor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    );
  }
}
