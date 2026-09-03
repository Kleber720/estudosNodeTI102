import pool from "../config/db";
import { CategoriaRepository } from "../repository/CategoriaRepository";
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { Categoria } from "../models/entidade/Categoria";

class CategoriaInfrastructure implements CategoriaRepository {
   
    async criarCategoria(categoria: Categoria): Promise<ResultSetHeader> {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query<ResultSetHeader>(
                'INSERT INTO categorias (nome_categoria) VALUES (?)',
                [categoria.getNome()]
            );
            return result;
        } finally {
            connection.release();
        }
    }

   
async buscarCategoriaPorId(id: number): Promise<RowDataPacket | undefined> {
    const connection = await pool.getConnection();
    try {
       
        const [rows] = await connection.query<RowDataPacket[]>(
            'SELECT * FROM categorias WHERE id = ?',
            [id]
        );
        return rows[0]; 
    } finally {
        connection.release();
    }
}


    async listarCategorias(): Promise<RowDataPacket[]> {
        const connection = await pool.getConnection();
        try {
            const [categorias] = await connection.query<RowDataPacket[]>(
                'SELECT * FROM categorias'
            );
            return categorias;
        } finally {
            connection.release();
        }
    }

    async atualizarCategoria(id: Number, categoria: Categoria): Promise<any> {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query(
                'UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?',
                [categoria.getNome(), id]
            );
            return result;
        } finally {
            connection.release();
        }
    }

    async deletarCategoria(id: Number): Promise<any> {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query(
                'DELETE FROM categorias WHERE id = ?',
                [id]
            );
            return result;
        } finally {
            connection.release();
        }
    }

}

const categoriaInfrastructure = new CategoriaInfrastructure();
export { categoriaInfrastructure };
export default categoriaInfrastructure;