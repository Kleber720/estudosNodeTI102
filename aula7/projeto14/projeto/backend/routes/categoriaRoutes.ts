import { Router } from "express";
import { listarCategorias, criarCategoria } from "../controllers/categoriaController";

const routerCategoria= new Router();

routerCategoria.get('/categorias', listarCategorias);
routerCategoria.post('/categorias', criarCategoria);

export default routerCategoria;