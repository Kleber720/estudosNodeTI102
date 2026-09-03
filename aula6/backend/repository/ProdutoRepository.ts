import { Produto } from "../models/entidade/Produto";
export interface ProdutoRepository {

    criarProduto(produto: Produto): Promise<any>;
    buscarProdutoPorNome(nome: String): Promise<any>;
    buscarProdutoPorId(id: Number): Promise<any>;
    listarProdutos(): Promise<any>;
    atualizarProduto(id: Number, produto: Produto): Promise<any>;
    atualizarProdutoParcial(id: Number, produto: Produto): Promise<any>;
    deletarProduto(id: Number): Promise<any>;

}