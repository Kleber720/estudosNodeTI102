import Usuario from "../models/entidade/Usuario";
import usuarioInfrastructure from "../infrastructure/UsuarioInfrasctructure";
import { UsuarioCadastrarDTO} from "../models/dto/UsuarioCadastrarDTO";
import { UsuarioListarDTO } from "../models/dto/UsuarioListarDTO";
import { UsuarioBuscarPorEmailDTO } from "../models/dto/UsuarioBuscarPorEmailDTO";

class UsuarioService {

    async listarUsuarios(): Promise<UsuarioListarDTO[]> {
        try {
            const usuarios = await usuarioInfrastructure.listar();
            return usuarios.map(usuario => ({
                id: usuario.getId(),
                nome: usuario.getNome(),
                email: usuario.getEmail().getValue()
            }));
        } catch (erro) {
            throw new Error(`Erro ao listar usuários: ${erro.message}`);
        }
    }

    async buscarUsuarioPorEmail(email: string): Promise<UsuarioBuscarPorEmailDTO | null> {
        try {
            const usuario:UsuarioBuscarPorEmailDTO = await usuarioInfrastructure.buscarPorEmail(email);
            if (usuario) {
                return {
                    email: usuario.email,
                    senha: usuario.senha
                };
            } else {
                return null;
            }
        } catch (erro) {
            throw new Error(`Erro ao buscar usuário por email: ${erro.message}`);
        }
    }

    async cadastrarUsuario(usuarioDTO: UsuarioCadastrarDTO): Promise<void> {
        try {
            const usuario = new Usuario(usuarioDTO.nome, usuarioDTO.email, usuarioDTO.senha);
            await usuarioInfrastructure.cadastrar(usuario);
        } catch (erro) {
            throw new Error(`Erro ao cadastrar usuário: ${erro.message}`);
        }
    }
 

}


const usuarioService = new UsuarioService();

export default usuarioService;