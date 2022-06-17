import {
  Table, TableBody, TableCell, TableHead,
  TableRow
} from "@material-ui/core";
import React from "react";
import "./styles.css";

export default class InfoPedido extends React.Component {
  constructor() {
    super();
    this.state = {
      pedidos: []
    };
  }

  componentDidMount() {
    this.findPedido()
  }

  async findPedido() {
    var requestOptions = {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    };

    const response = await fetch("https://sistemalift1.com/lift_ps/api/pedidos", requestOptions);
    const pedidos = await response.json();
    //percorre lista e salva novos atributos
    await Promise.all(pedidos.map(async (pedido) => {
      if (pedido) {
        let itensPedido = await this.findItemPedido(pedido.id)
        let cliente = await this.findCliente(pedido.cliente)
        let produtos = [];

        if (itensPedido.length) {
          await Promise.all(itensPedido.map(async (item) => {
            produtos.add(await this.findProduto(item.produto))
          }))

        }
        console.log(itensPedido, cliente, produtos)
        pedido = { ...pedido, cliente, produtos }

      }

      //sea info no pedido
      // console.log(pedido)
    }))

    //salva no estado
    this.setState({ pedidos });

  }

  async findCliente(clienteId) {
    var requestOptions = {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    };

    const response = await fetch("https://sistemalift1.com/lift_ps/api/clientes/" + clienteId, requestOptions);
    const pedidos = await response.json();
    return pedidos
  }

  async findItemPedido(idPedido) {
    var requestOptions = {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    };

    const response = await fetch("https://sistemalift1.com/lift_ps/api/ItensPedido/" + idPedido, requestOptions);
    const pedidos = await response.json();
    console.log(pedidos)
    return pedidos
  }

  async findProduto(idPedido) {
    var requestOptions = {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    };

    const response = await fetch("https://sistemalift1.com/lift_ps/api/Produtos/" + idPedido, requestOptions);
    const pedidos = await response.json();
    return pedidos
  }

  handleRowClick() {
    this.props.history.push("/informacaoPedido");
  };

  render() {
    //recupera do estado
    const { pedidos } = this.state
    // console.log(pedidos)
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
            {pedidos && pedidos.map((row) => (
              <TableRow key={row.id} onClick={this.handleRowClick}>
                <TableCell component="th" scope="row">
                  {pedidos.indexOf(row) + 1}
                </TableCell>
                <TableCell align="center">{row.nome}</TableCell>
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
