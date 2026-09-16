import pool from "../config/db";
import  Usuario  from "../models/entidade/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";

class UsuarioInfrastructure implements UsuarioRepository  {

    async cadastrar(usuario: Usuario): Promise<void> {
        const connection= await pool.getConnection();
        try{
                
                await connection.beginTransaction();
                const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
                await connection.query(query, [usuario.getNome(), usuario.getEmail().getValue(), usuario.getSenha().getValue()]);
                await connection.commit();
        }catch (error) {
            await connection.rollback();
            throw error;
        }finally{
            connection.release();
        }
        
    }

    async buscarPorEmail(email: string): Promise<Usuario | null> {
            
            const connection= await pool.getConnection();
            try{
                const query = 'SELECT * FROM usuarios WHERE email = ?';
                const [rows] = await connection.query(query, [email]);
                if (Array.isArray(rows) && rows.length > 0) {
                    const row: any = rows[0];
                    return new Usuario(row.nome, row.email, row.senha, row.id);
                } else {
                    return null;
                }
            }catch (error) {
                throw error;
            }finally{
                connection.release();
            }
    }


    async listar(): Promise<Usuario[]> {
        const connection= await pool.getConnection();
        try{

            const [resposta]= await connection.query('SELECT * FROM usuarios');
           
            if (!Array.isArray(resposta)) {
                throw new Error('Erro ao listar usuários: resultado inesperado da consulta');
            }
            const usuarios = resposta.map((usuario: any) => {
                return new Usuario(
                    usuario.nome,
                    usuario.email,
                    usuario.senha,
                    usuario.id
                );
            });

            return usuarios;
        }catch (error) {
            throw error;
        }finally{
            connection.release();
        }
    }
}

const usuarioInfrastructure = new UsuarioInfrastructure();
export default usuarioInfrastructure;