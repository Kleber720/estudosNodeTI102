import { Request, Response } from "express";
import usuarioService from "../services/UsuarioService";

class UsuarioController {
    async listarUsuarios(req: Request, res: Response): Promise<Response> {
        try {
            const usuarios = await usuarioService.listarUsuarios();
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({ message: `Erro ao listar usuários: ${error.message}` });
        }
    }

    async buscarUsuarioPorEmail(req: Request, res: Response): Promise<Response> {
        try {
            const { email } = req.params;
            const usuario = await usuarioService.buscarUsuarioPorEmail(email);
            if (usuario) {
                return res.status(200).json(usuario);
            } else {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
        } catch (error) {
            return res.status(500).json({ message: `Erro ao buscar usuário: ${error.message}` });
        }
    }

    async cadastrarUsuario(req: Request, res: Response): Promise<Response> {
        try {
            const usuarioDTO = req.body;
            await usuarioService.cadastrarUsuario(usuarioDTO);
            return res.status(201).json({ message: "Usuário cadastrado com sucesso" });
        } catch (error) {
            return res.status(500).json({ message: `Erro ao cadastrar usuário: ${error.message}` });
        }
    }
}

const usuarioController = new UsuarioController();

export default usuarioController;