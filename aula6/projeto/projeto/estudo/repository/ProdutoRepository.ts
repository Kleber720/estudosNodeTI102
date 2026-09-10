interface ProdutoRepository {   

      cadastrarProduto(nome: string, preco: number): void;
      atualizarProduto(id: number, nome: string, preco: number): void;
      deletarProduto(id: number): void;
      listarProdutos(): void;
 

}