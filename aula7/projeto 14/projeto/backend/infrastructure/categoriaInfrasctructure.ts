import pool from "../config/db";
import { CategoriaRepository } from "../repository/CategoriaRepository";
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { Categoria } from "../models/entidade/Categoria";

class CategoriaInfrastructure implements CategoriaRepository {
    
    async criarCategoria(categoria: Categoria): Promise<any> {
        const connection = await pool.getConnection();
        try{
            
            const [result]= await connection.query<ResultSetHeader>("INSERT INTO categorias (nome_categoria) VALUES (?)", [categoria.getNome()]);
            return result.insertId;

        }catch (error) {
            throw error;

        }finally{
                
                connection.release();
        }


  
}

async listarCategorias(): Promise<any> {
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

   async buscarCategoriaPorNome(nome: string): Promise<any> {
    const connection = await pool.getConnection();
    try {
        const [categoria] = await connection.query<RowDataPacket[]>(
            'SELECT * FROM categorias WHERE nome_categoria = ?',
            [nome]
        );
        return categoria;
    } finally {
        connection.release();
    }
   }
   async buscarCategoriaPorId(id: number): Promise<any> {   
    
        const connection = await pool.getConnection();
        try {
            const [categoria] = await connection.query<RowDataPacket[]>(
                'SELECT * FROM categorias WHERE id = ?',
                [id]
            );
            return categoria;
        } finally {
            connection.release();
        }

   }



}
const categoriaInfrastructure = new CategoriaInfrastructure();

// export { categoriaInfrastructure };
export default categoriaInfrastructure;