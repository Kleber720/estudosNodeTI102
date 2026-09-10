
import { CadastrarUsuarioDTO } from "../models/dto/usuario/CadastrarUsuario";
import{ListarUsuariosDTO} from "../models/dto/usuario/ListarUsuarioDTO"
import  usuarioInfrastructure  from "../infrastructure/UsuarioInfrastructure";
import { buscarUsuarioPorEmail } from "../models/dto/usuario/BuscarUsuarioPorEmailDTO";
import { UsuarioEntitie } from "../models/entidade/UsuarioEntiti";

class UsuarioServices{
    public tratarNome(nome: String): string{
            
            return nome.trim().toUpperCase();
    }

   async criarUsuario(cadastrarUsuarioDTO:CadastrarUsuarioDTO): Promise<CadastrarUsuarioDTO> {
   try{
    const validarusuario= await usuarioInfrastructure.criarUsuario(this.tratarNome(cadastrarUsuarioDTO.nome));

        const usuario= new UsuarioEntitie(cadastrarUsuarioDTO.nome, cadastrarUsuarioDTO.email, cadastrarUsuarioDTO.senha);
        const id = await usuarioInfrastructure.criarUsuario(usuario);

        const usuarioResponse: ListarUsuariosDTO = {
            id: id,
            nome: cadastrarUsuarioDTO.nome,
            email: cadastrarUsuarioDTO.email,
            senha: cadastrarUsuarioDTO.senha
        }
        return usuarioResponse;
   }catch (erro) {
    throw new Error(`Erro ao criar usuario: ${erro.message}`);
    }

}

   async listarUsuarios(): Promise<ListarUsuariosDTO[]> {
    try{
        const usuarios= await usuarioInfrastructure.listarUsuarios();
    const usuariosResponse: ListarUsuariosDTO[] = [];

    for(const usuario of usuarios){
        const usuarioResponse: ListarUsuariosDTO = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha
        };

        usuariosResponse.push(usuarioResponse);
    }
    return usuariosResponse;
    }catch(erro){
        throw new Error(`Erro ao listar usuarios: ${erro.message}`);
   
   }
   
}

async buscarUsuarioPorEmail(email: string): Promise<buscarUsuarioPorEmail>{
    try{
        const usuario= await usuarioInfrastructure.buscarUsuarioPorEmail(email);
    const usuarioResponse: buscarUsuarioPorEmail = {
        nome: usuario[0].nome,
        email: usuario[0].email,
    }
    return usuarioResponse;
    }catch(erro){
        throw new Error(`Erro ao buscar usuario por email: ${erro.message}`); 
        }

    }   

}

const usuarioServices= new UsuarioServices();

export default usuarioServices;
