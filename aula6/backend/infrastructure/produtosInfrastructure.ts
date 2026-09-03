import { Produto } from "../models/entidade/Produto";
import { ProdutoRepository } from "../repository/ProdutoRepository";
import pool from "../config/db";
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { Categoria } from "../models/entidade/Categoria";


class ProdutoInfrastructure implements ProdutoRepository {
    private getPrecoBanco(produto: Produto): number {
        return produto.getPreco().getPreco();
    }

    private getDataVencimentoBanco(produto: Produto): Date {
        return produto.getDataVencimento().getData();
    }

    private getIdCategoriaBanco(produto: Produto): number | undefined {
        return produto.getCategoria().getId();
    }
    

    async criarProduto(produto: Produto): Promise<boolean> {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query<ResultSetHeader>(
                'INSERT INTO produtos (nome, descricao, valor, data_vencimento,id_categoria) VALUES (?, ?, ?, ?, ?)',
                [
                    produto.getNome(),
                    produto.getDescricao(),
                    this.getPrecoBanco(produto),
                    this.getDataVencimentoBanco(produto),
                    this.getIdCategoriaBanco(produto)
                ]
            );
            return result.affectedRows > 0;
        }finally {
            connection.release();
        }
    }

    async listarProdutos(): Promise<RowDataPacket[]> {
        const connection = await pool.getConnection();
        try {
            const [produtos] = await connection.query<RowDataPacket[]>(
                'SELECT * FROM produtos'
            );
            return produtos;
        } finally {
            connection.release();
        }
    }

    async buscarProdutoPorId(id: number): Promise<RowDataPacket[]> {
        const connection = await pool.getConnection();
        try {
            const [produto] = await connection.query<RowDataPacket[]>(
                'SELECT * FROM produtos WHERE id = ?',
                [id]
            );
            return produto;
        } finally {
            connection.release();
        }
    }

    async buscarProdutoPorNome(nome: String): Promise<any> {
        const connection = await pool.getConnection();
        try {
            const [produto] = await connection.query<RowDataPacket[]>(
                'SELECT * FROM produtos WHERE nome = ?',
                [nome]
            );
            return produto;
        } finally {
            connection.release();
        }
    }

    async atualizarProduto(id: number, produto: Produto): Promise<boolean> {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query<ResultSetHeader>(
                'UPDATE produtos SET nome = ?, descricao = ?, valor = ?, data_vencimento = ?, id_categoria = ? WHERE id = ?',
                [
                    produto.getNome(),
                    produto.getDescricao(),
                    this.getPrecoBanco(produto),
                    this.getDataVencimentoBanco(produto),
                    this.getIdCategoriaBanco(produto),
                    id
                ]
            );
            return result.affectedRows > 0;
        } finally {
            connection.release();
        }
    }

    async atualizarProdutoParcial(id: number, produto: Produto): Promise<boolean> {
        const connection = await pool.getConnection();
        try {
            let query = 'UPDATE produtos SET ';
            const parametros: any[] = [];
            
            if (produto.getNome()) {
                query += 'nome = ?, ';
                parametros.push(produto.getNome());
            }
            if (produto.getDescricao()) {
                query += 'descricao = ?, ';
                parametros.push(produto.getDescricao());
            }
            if (produto.getPreco()) {
                query += 'valor = ?, ';
                parametros.push(this.getPrecoBanco(produto));
            }
            if (produto.getDataVencimento()) {
                query += 'data_vencimento = ?, ';
                parametros.push(this.getDataVencimentoBanco(produto));
            }
            if (produto.getCategoria()) {
                query += 'id_categoria = ?, ';
                parametros.push(this.getIdCategoriaBanco(produto));
            }

            if (parametros.length === 0) {
                throw new Error('Nenhum dado para atualizar');
            }

            const [result] = await connection.query<ResultSetHeader>(
                query.slice(0, -2) + ' WHERE id = ?',
                [...parametros, id]
            );
            
            return result.affectedRows > 0;
        } finally {
            connection.release();
        }
    }

    async deletarProduto(id: number): Promise<boolean> {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query<ResultSetHeader>(
                'DELETE FROM produtos WHERE id = ?',
                [id]
            );
            return result.affectedRows > 0;
        } finally {
            connection.release();
        }
    }
}

const produtoInfrastructure = new ProdutoInfrastructure();
export { ProdutoInfrastructure };     //  Usar na UC de Teste
export default produtoInfrastructure; //  Acessar pela controller


