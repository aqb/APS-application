import { Router } from "express";
import { container } from "tsyringe";

import TelaCadastroPresenter from "./comunicacao/TelaCadastroPresenter";
import TelaLoginPresenter from "./comunicacao/TelaLoginPresenter";

const cadastroPresenter = container.resolve(TelaCadastroPresenter);
const loginPresenter = container.resolve(TelaLoginPresenter);

const routes = Router();

routes.post("/cadastro", (req, res) => cadastroPresenter.cadastro(req, res));
routes.post("/login", (req, res) => loginPresenter.login(req, res));

export default routes;
