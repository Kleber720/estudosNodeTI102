import { UsuarioEntitie } from "../models/entidade/UsuarioEntiti";

export interface UsuarioRepository{

    criarUsuario(usuario: UsuarioEntitie): Promise<any>;
    buscarUsuarioPorEmail(email: string): Promise<any>;
    listarUsuarios():Promise<any>;

}
