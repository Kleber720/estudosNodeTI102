import { Produto } from "../models/entities/produto";

export interface ProdutoRepository{

    criarProduto(produto:Produto): Promise<any>;
    buscarPodutoPorId(id:number): Promise<any>;
    listarProdutos(): Promise<any>;
    atualizarProduto(id:number, produto:Produto): Promise<any>;
    atualizarProdutoParcial(id:number, produto: any): Promise<any>;
    deletarProduto(id:number): Promise<any>;

}