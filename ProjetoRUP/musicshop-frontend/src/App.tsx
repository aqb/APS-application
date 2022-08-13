import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TelaCadastro from "./telas/TelaCadastro";
import TelaCarrinho from "./telas/TelaCarrinho";
import TelaHome from "./telas/TelaHome";
import TelaLogin from "./telas/TelaLogin";
import TelaProduto from "./telas/TelaProduto";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<TelaCadastro />}></Route>
        <Route path="/login" element={<TelaLogin />}></Route>
        <Route path="/home" element={<TelaHome />}></Route>
        <Route path="/produto/:produtoId" element={<TelaProduto />}></Route>
        <Route path="/carrinho" element={<TelaCarrinho />}></Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
