import{ request, response} from "express"
import { CadastrarUsuarioDTO } from "../models/dto/usuario/CadastrarUsuario"
import usuarioServices from "../services/UsuarioServices"

export async function listarUsuarios(req:request,res:response){
    try{
        const usuarios= await usuarioServices.listarUsuarios();
        res.status(200).json(usuarios);
    }catch(erro){
        console.error('Erro ao listar usuarios:', erro);
        res.status(500).json({ error: 'Erro ao listar usuarios' });
    }
}

export async function criarUsuario(req:request,res:response){
    
        try{
            const usuarioDTO:CadastrarUsuarioDTO=req.body;
            const novoUsuario= await usuarioServices.criarUsuario(usuarioDTO);
            res.status(201).json({novoUsuario,mensagem:'Usuario criado com sucesso'});
        }catch(erro){
            console.error('Erro ao criar usuario:', erro);
            res.status(500).json({ error: 'Erro ao criar usuario' });
        }
        
}