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

import { ColorModeSwitcher } from "./ColorModeSwitcher";
import TelaCadastro from "./telas/telaCadastro";
import TelaCriarPedido from "./telas/telaCriarPedido";
import TelaLogin from "./telas/telaLogin";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/finalizarpedido" element={<TelaCriarPedido />}></Route>
        <Route path="/cadastro" element={<TelaCadastro />}></Route>
        <Route path="/login" element={<TelaLogin />}></Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
