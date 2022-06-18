import {
  Table, TableBody, TableCell, TableHead,
  TableRow
} from "@material-ui/core";

import React from "react";
import "./styles.css";


class ListaPedido extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidos: []
    };
    // this.handleRowClick = this.handleRowClick.bind(this, id);

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
    this.setState({ loading: true });
    const response = await fetch("https://sistemalift1.com/lift_ps/api/pedidos", requestOptions);
    let pedidosResponse = await response.json();
    //percorre lista e salva novos atributos
    await Promise.all(pedidosResponse.map(async (pedido) => {
      if (pedido) {
        let itensPedido = await this.findItemPedido(pedido.id)
        let cliente = await this.findCliente(pedido.cliente)
        let produtos = [];

        if (itensPedido.length) {
          await Promise.all(itensPedido.map(async (item) => {
            let produto = await this.findProduto(item.produto)
            produto.valorCompra = item.quantidade * produto.valor

            produtos.push(produto)
          }))

        }
        let sum = 0;
        for (let i = 0; i < produtos.length; i++) {
          sum += produtos[i].valorCompra;
        }

        pedido = { "id": pedido.id, clienteNome: cliente.nome, "data": pedido.data, valor: sum }
        this.setState({ pedidos: [...this.state.pedidos, pedido] });
      }
    }))

    this.setState({ loading: false });

  }

  async findCliente(clienteId) {
    var requestOptions = {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    };

    const response = await fetch("https://sistemalift1.com/lift_ps/api/clientes/" + clienteId, requestOptions);
    const clientes = await response.json();
    return clientes
  }

  async findItemPedido(idPedido) {
    var requestOptions = {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    };

    const response = await fetch("https://sistemalift1.com/lift_ps/api/ItensPedido/" + idPedido, requestOptions);
    const itensPedido = await response.json();
    return itensPedido
  }

  async findProduto(idPedido) {
    var requestOptions = {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    };


    const response = await fetch("https://sistemalift1.com/lift_ps/api/Produtos/" + idPedido, requestOptions);
    const produtos = await response.json();
    return produtos
  }

  handleRowClick(id) {
    this.props.history.push("/pedido/" + id);
  };

  render() {
    const { pedidos, loading } = this.state

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
            {pedidos && !loading && pedidos.map((row) => (
              <TableRow key={row.id} onClick={this.handleRowClick.bind(this, row.id)}>
                <TableCell component="th" scope="row">
                  {pedidos.indexOf(row) + 1}
                </TableCell>
                <TableCell align="center">{row.clienteNome}</TableCell>
                <TableCell align="center">{row.data}</TableCell>
                <TableCell align="center">{row.valor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>


    );
  }
}
export default ListaPedido