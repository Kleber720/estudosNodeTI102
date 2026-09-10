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

    async listarProdutos(): Promise<ProdutoResponseDTO[]> {
        try {
            const produtos = await produtoInfrastructure.listarProdutos();
            const produtosResponse: ProdutoResponseDTO[] = [];

            for (const produto of produtos) {
                const categoria = await categoriaInfrastructure.buscarCategoriaPorId(produto.id_categoria);

                if (!categoria) {
                    throw new Error(`Categoria com ID ${produto.id_categoria} não encontrada`);
                }
                
                const categoriaProduto= await categoriaInfrastructure.buscarCategoriaPorId(produto.id_categoria);

                const produtoResponse: ProdutoResponseDTO = {
                    id: produto.id,
                    nome: produto.nome,
                    descricao: produto.descricao,
                    valor: produto.valor,
                    data_vencimento: produto.data_vencimento,
                    categoria: {
                        id: categoriaProduto.id,
                        nome_categoria: categoriaProduto.nome_categoria
                    }
                };

                produtosResponse.push(produtoResponse);
            }

            return produtosResponse;
        } catch (erro) {
            throw new Error(`Erro ao listar produtos: ${erro.message}`);
        }

    }

    async criarProduto(produtoDTO: CriarProdutoDTO): Promise<ProdutoResponseDTO> {
            try{
                //implementar uma camada para tratar os erros de entrada 
                const validarNome = await produtoInfrastructure.buscaProdutoPorNome(  this.tratarNome(produtoDTO.nome));

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
                  const categoriaProduto= await categoriaInfrastructure.buscarCategoriaPorId(produtoDTO.id_categoria);
                    const produtoNovo:ProdutoResponseDTO={
                            id: novoProdutoID,
                            nome: String(produto.getNome()) ,
                            descricao:String(produto.getDescricao()),
                            valor: produto.getPreco().getPreco(),
                            data_vencimento: produto.getDataVencimento().getData(),
                            categoria: {
                            id: verificarCategoria.id,
                            nome_categoria: categoriaProduto.nome
                            }
                    }


                    return  produtoNovo;
                  
            }catch(erro){
                throw new Error(`Erro ao criar produto: ${erro.message}`);
            }

    }


}


const produtoService = new ProdutoService();
export default produtoService;