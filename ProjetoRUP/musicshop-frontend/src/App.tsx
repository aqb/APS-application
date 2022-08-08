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
import TelaLogin from "./telas/telaLogin";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/TelaCadastro" element={<TelaCadastro />}></Route>
        <Route path="/" element={<TelaLogin />}></Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
