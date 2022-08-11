import * as React from "react";

import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme
} from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TelaCadastro from "./telas/TelaCadastro";
import TelaCriarPedido from "./telas/TelaCriarPedido";
import TelaHome from "./telas/TelaHome";
import TelaLogin from "./telas/TelaLogin";
import TelaProduto from "./telas/TelaProduto";
import TelaProdutos from "./telas/TelaProdutos";
import TelaProdutoUnico from "./telas/TelaProdutoUnico";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/produtounico" element={<TelaProdutoUnico />}></Route>
        <Route path="/finalizarpedido" element={<TelaCriarPedido />}></Route>
        <Route path="/cadastro" element={<TelaCadastro />}></Route>
        <Route path="/login" element={<TelaLogin />}></Route>
        <Route path="/produtos" element={<TelaProdutos />}></Route>
        <Route path="/produto" element={<TelaProduto />}></Route>
        <Route path="/home" element={<TelaHome />}></Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
