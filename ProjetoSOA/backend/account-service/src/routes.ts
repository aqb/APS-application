import { Router } from "express";
import { container } from "tsyringe";

import TelaCadastroPresenter from "./comunicacao/Presenters/TelaCadastroPresenter";
import TelaLoginPresenter from "./comunicacao/Presenters/TelaLoginPresenter";

const cadastroPresenter = container.resolve(TelaCadastroPresenter);
const loginPresenter = container.resolve(TelaLoginPresenter);

const routes = Router();

// TODO: Funcs async??
routes.post("/cadastro", (req, res) => cadastroPresenter.cadastro(req, res));
routes.post("/login", (req, res) => loginPresenter.login(req, res));
routes.get("/health", (req, res) => res.status(200).send());

export default routes;
