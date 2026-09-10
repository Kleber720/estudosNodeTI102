import {Router} from "express";
import { listarUsuarios, criarUsuario } from "../controllers/usuarioController";

const routerUsuario= new Router();

routerUsuario.get('/usuarios', listarUsuarios);
routerUsuario.post('/usuarios', criarUsuario);

export default routerUsuario;