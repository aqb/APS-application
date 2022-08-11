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
import TelaEstoque from "./telas/TelaEstoque";
import TelaLogin from "./telas/TelaLogin";
import TelaProduto from "./telas/TelaProduto";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/finalizarpedido" element={<TelaCriarPedido />}></Route>
        <Route path="/cadastro" element={<TelaCadastro />}></Route>
        <Route path="/login" element={<TelaLogin />}></Route>
        <Route path="/estoque" element={<TelaEstoque />}></Route>
        <Route path="/produto/:produtoId" element={<TelaProduto />}></Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
