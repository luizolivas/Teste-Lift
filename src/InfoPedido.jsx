import React from "react";

// import "./styles.css";

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';

import {
  Table, TableBody, TableCell, TableHead,
  TableRow
} from "@material-ui/core";


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

  //url = (window.location.pathname + "").replace("/pedido/", "");

  async findPedido() {
    var requestOptions = {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    };

    this.setState({ loading: true });
    const response = await fetch("https://sistemalift1.com/lift_ps/api/pedidos/" + (window.location.pathname + "").replace("/pedido/", ""), requestOptions);
    let pedido = await response.json();
    //percorre lista e salva novos atributos

    if (pedido) {
      let itensPedido = await this.findItemPedido(pedido.id)
      let cliente = await this.findCliente(pedido.cliente)
      let produtos = [];

      if (itensPedido.length) {
        await Promise.all(itensPedido.map(async (item) => {
          let produto = await this.findProduto(item.produto)
          produto.valorCompra = item.quantidade * produto.valor
          produto.quantidade = item.quantidade
          produtos.push(produto)
        }))

      }
      let sum = 0;
      for (let i = 0; i < produtos.length; i++) {
        sum += produtos[i].valorCompra;
      }

      console.log(produtos)
      pedido = { "id": pedido.id, cliente, "data": pedido.data, valor: sum, produtos }
      this.setState({ pedido: pedido });
    }


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
    console.log(clientes)
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


  render() {
    const { pedido, loading } = this.state
    return (

      <div className="App" >
        <Typography variant="h5" component="div" align="left" >
          Informações do Pedido
        </Typography>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom >
            </Typography >
            <Typography variant="h5" component="div" align="left" >
              Dados cliente
            </Typography>
            <Typography sx={{ mb: 1.5 }} display={"inline"} >
              Nome:  <label for="demo1">{pedido && pedido.cliente && pedido.cliente.nome}</label>
              <br />
              CPF: <label for="demo1">{pedido && pedido.cliente && pedido.cliente.cpf}</label>
              <br />
              Data: <label for="demo1">{pedido && pedido.data}</label>
              <br />
              E-mail: <label for="demo1">{pedido && pedido.cliente && pedido.cliente.email}</label>

            </Typography>
            <Typography sx={{ mb: 1.5 }} align="center" >

            </Typography>
            <Typography sx={{ mb: 1.5 }} align="right">

            </Typography>

          </CardContent>
        </Card>
        <Typography variant="h5" component="div" align="left" marginTop={'50px'} >
              Itens do Pedido
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pedido</TableCell>
              <TableCell align="center">Produto</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="center">Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedido && pedido.produtos.length && !loading && pedido.produtos.map((produto) => (
              <TableRow>
                <TableCell>{produto && produto.id}</TableCell>
                <TableCell align="center">{produto.nome}</TableCell>
                <TableCell align="center">{produto.quantidade}</TableCell>
                <TableCell align="center">R$ {produto.valor}</TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
        <Typography variant="h6" component="div" align="right" marginRight={'65px'}>
          Total: R$ <label for="demo1">{pedido && pedido.valor && pedido.valor}</label>
        </Typography>
      </div>

    );
  }
}

