import { pool } from '../config/db';
import { Produto } from "../models/entities/produto";
import { ProdutoRepository } from '../repository/ProdutoRepository';


class ProdutoInfrastructure implements ProdutoRepository{

    async criarProduto(produto: Produto): Promise<any> {
        const [result] = await pool.query('INSERT INTO produtos (nome, descricao, preco, dataVencimento) VALUES (?, ?, ?, ?)', [data.getNome(), data.getDescricao(), produto.getPreco().getPreco(), produto.getDataVencimento()]);
        return result;
    
    
}
    async buscarPodutoPorId(id: number): Promise<any> {
        const [produtos]=await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
    return produtos;
}

    async listarProdutos(): Promise<any> {
        const [produtos]= await pool.query('SELECT * FROM produtos');
        return produtos;
}

    async atualizarProduto(id: number, produto: Produto): Promise<any> {
        const [result]=await pool.query("UPDATE produtos SET nome = ?, descricao = ?, preco = ?, dataVencimento = ? WHERE id = ?",[produto.getNome(), produto.getDescricao(), produto.getPreco().getPreco(), produto.getDataVencimento(),id]);
        return result;
    }

    async atualizarProdutoParcial(id: number, data: any): Promise<any> {
        let query='UPDATE produtos SET';
        const parametros:any[]=[];

        if(data.nome){
            query+=' nome = ?,'; 
            parametros.push(data.nome);

        }if(data.descricao){
            query+=' descricao = ?,'; 
            parametros.push(data.descricao);

        }if (data.preco){
            query+=' preco = ?,'; 
            parametros.push(data.preco);

        }if (data.dataVencimento){
            query+=' dataVencimento = ?,'; 
            parametros.push(data.dataVencimento);

        }if (parametros.length === 0){
            throw new Error("Nenhum campo para atualizar");
        }

        
        const [result]=await pool.query(query.slice(0,-2)+' WHERE id = ?',[...parametros,id]);

        return result.affectedRows > 0;
    }

    async deletarProduto(id: number): Promise<any> {
        const [result]=await pool.query("DELETE FROM produtos WHERE id =?",[id]);
        return result;
    }

}







   