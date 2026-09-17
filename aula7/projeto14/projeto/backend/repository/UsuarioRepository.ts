

export interface UsuarioRepository {    
    cadastrar(usuario: any): Promise<void>;
    buscarPorEmail(email: string): Promise<any | null>;
    listar(): Promise<any[]>;
}