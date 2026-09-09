import { UsuarioRepository } from "../repository/UsuarioRepository";
import pool from "../config/db"
import { UsuarioEntitie } from "../models/entidade/UsuarioEntiti"; 
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export class UsuarioInfrastructure implements UsuarioRepository{

    async criarUsuario(usuario: any): Promise<any> {
        const connection = await pool.getConnection();
        
        try {
            const [result] = await connection.query<ResultSetHeader>(
                'INSERT INTO usuarios (nome,email,senha) VALUES (?,?,?)', [usuario.getNome(), usuario.getEmail(), usuario.getSenha()])
                return result.insertId;

        }catch (error) {

            throw error;

    }finally{
        connection.release();
        }
    }
    async buscarUsuarioPorEmail(email: string): Promise<any> {
        const connection = await pool.getConnection();

        try {
            const [usuario] = await connection.query<RowDataPacket[]>(
                'SELECT * FROM usuarios WHERE email = ?', [email])
                return email

        }catch (error) {

            throw error;

        }finally{
            connection.release();
        }
    }
    async listarUsuarios(): Promise<any> {
        const connection =  await pool.getConnection();

        try{
            const [usuarios] = await connection.query<RowDataPacket[]>(
                'SELECT * FROM usuarios')
                return usuarios

        }catch (error) {

            throw error;

        }finally{

            connection.release();
        }
    }

}