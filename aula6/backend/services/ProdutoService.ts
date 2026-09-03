import produtoInfrastructure from "../infrastructure/produtosInfrastructure";
import categoriaInfrastructure from "../infrastructure/categoriaInfrasctructure";
import { Produto } from "../models/entidade/Produto";
import { CriarProdutoDTO } from "../models/dto/CriarProdutoDTO";
import { AtualizarProdutoDTO } from "../models/dto/AtualizarProdutoDTO";
import {ProdutoResponseDTO} from "../models/dto/ProdutoResponseDTO";
import { Categoria } from "../models/entidade/Categoria";
 
 
class ProdutoService{
    tratarNome(nome: String): String{      
        return nome.trim().toUpperCase();
    }
 
    async criarProduto(produtoDTO: CriarProdutoDTO): Promise<ProdutoResponseDTO> {
            try{
                //implementar uma camada para tratar os erros de entrada
                const validarNome = await produtoInfrastructure.buscarProdutoPorNome(  this.tratarNome(produtoDTO.nome));
 
                if(validarNome.length > 0){
                    throw new Error('Produto já existe');
                }
 
                const verificarCategoria = await categoriaInfrastructure.buscarCategoriaPorId(produtoDTO.id_categoria);
 
                if(!verificarCategoria){
                    throw new Error('Categoria não existe');
                }
 
 
                const categoria = new Categoria(verificarCategoria.nome, verificarCategoria.id);
 
                const produto = new Produto(
                    this.tratarNome(produtoDTO.nome),
                    produtoDTO.descricao,
                    produtoDTO.valor,
                    produtoDTO.data_vencimento,
                    categoria
                );
 
                  const novoProdutoID=await produtoInfrastructure.criarProduto(produto);
 
                    const produtoNovo:ProdutoResponseDTO={
                            id: novoProdutoID,
                            nome: String(produto.getNome()) ,
                            descricao:String(produto.getDescricao()),
                            valor: produto.getPreco().getPreco(),
                            dataVencimento: produto.getDataVencimento().getData(),
                            categoria: {
                            id: verificarCategoria.id,
                            nomeCategoria: verificarCategoria.nome
                            }
                    }
 
 
                    return  produtoNovo;
                 
            }catch(erro){
                throw new Error(`Erro ao criar produto: ${erro.message}`);
            }
 
    }
 
 
}
const produtoService = new ProdutoService();
export default produtoService