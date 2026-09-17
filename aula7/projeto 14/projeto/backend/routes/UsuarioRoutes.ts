import {Router} from "express";
import usuarioController from "../controllers/usuarioController";
const routerUsuario= Router();

routerUsuario.get("/usuario", usuarioController.listarUsuarios);
routerUsuario.get("/usuario/:email", usuarioController.buscarUsuarioPorEmail);
routerUsuario.post("/usuario", usuarioController.cadastrarUsuario);


export default routerUsuario;