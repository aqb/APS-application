import { Router } from "express";
import { container, delay } from "tsyringe";

import TelaCadastroPresenter from "./comunicacao/TelaCadastroPresenter";
import TelaLoginPresenter from "./comunicacao/TelaLoginPresenter";
import TelaPedidoPresenter from "./comunicacao/TelaPedidoPresenter";
import TelaProdutoPresenter from "./comunicacao/TelaProdutoPresenter";
import TelaProdutosPresenter from "./comunicacao/TelaProdutosPresenter";

const cadastroPresenter = container.resolve(TelaCadastroPresenter);
const loginPresenter = container.resolve(TelaLoginPresenter);
const pedidoPresenter = container.resolve(TelaPedidoPresenter);
const produtoPresenter = container.resolve(TelaProdutoPresenter);
const produtosPresenter = container.resolve(TelaProdutosPresenter);

const routes = Router();

routes.post("/cadastro", (req, res) => cadastroPresenter.cadastro(req, res));
routes.get("/login", (req, res) => loginPresenter.login(req, res));
routes.get("/pedido", (req, res) => pedidoPresenter.criarPedido(req, res));
routes.get("/produto", (req, res) =>
  produtoPresenter.adicionarCarrinho(req, res)
);

// TODO: Criar func de buscar produtos e atualizar a lista com eles.
// routes.get("/produtos", (req, res) => produtosPresenter.(req, res));

export default routes;
