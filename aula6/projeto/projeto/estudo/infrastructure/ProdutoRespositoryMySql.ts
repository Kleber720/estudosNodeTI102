
class ProdutoRepositoryMySql implements ProdutoRepository {

    cadastrarProduto(nome: string, preco: number): void {
        console.log(`Cadastrando produto no MySQL: ${nome} - R$${preco}`);
    }
    atualizarProduto(id: number, nome: string, preco: number): void {
        console.log(`Atualizando produto no MySQL: ${id} - ${nome} - R$${preco}`);
    }
    deletarProduto(id: number): void {
        console.log(`Deletando produto no MySQL: ${id}`);
    }
    listarProdutos(): void {
        console.log(`Listando produtos do MySQL`);
    }

}