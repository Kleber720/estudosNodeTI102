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
                console.log(categoriaProduto)
                const produtoResponse: ProdutoResponseDTO = {
                    id: produto.id,
                    nome: produto.nome,
                    descricao: produto.descricao,
                    valor: produto.valor,
                    data_vencimento: produto.data_vencimento,
                    categoria: {
                        id: categoriaProduto[0].id,
                        nome_categoria: categoriaProduto[0].nome_categoria
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

                console.log("verificando o valor de categoria buscado: ",verificarCategoria)
                const categoria = new Categoria(verificarCategoria[0].nome_categoria, verificarCategoria[0].id); 

                console.log("Esta criando uma categoria: ",categoria)

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
                            nome_categoria: categoriaProduto.nome_categoria
                            }
                    }
                    return  produtoNovo;
                  
            }catch(erro){
                throw new Error(`Erro ao criar produto: ${erro.message}`);
            }

    }

    async atualizarProduto(id:number, produtoDTO: AtualizarProdutoDTO): Promise<ProdutoResponseDTO>{

        try{
            const produtoExistente = await produtoInfrastructure.buscarProdutoPorId(id);
            if(!produtoExistente) {
                throw new Error('Produto não encontrado');
            }

            const produtoAtualizado = new Produto(
                produtoDTO.nome ? this.tratarNome(produtoDTO.nome) : produtoExistente[0].nome,
                produtoDTO.descricao ? produtoDTO.descricao : produtoExistente[0].descricao,
                produtoDTO.valor ? produtoDTO.valor : produtoExistente[0].valor,
                produtoDTO.data_vencimento ? produtoDTO.data_vencimento : produtoExistente[0].data_vencimento,
                new Categoria(produtoExistente[0].categoria.nome_categoria, produtoExistente[0].categoria.id)
            );

           const resposta= await produtoInfrastructure.atualizarProduto(id, produtoAtualizado);
           if(!resposta){
            throw new Error('Produto não foi atualizado !');
           }

              const categoriaProduto= await categoriaInfrastructure.buscarCategoriaPorId(produtoAtualizado.getCategoria().getId());
    
                const produtoResponse: ProdutoResponseDTO = {
                 id: id,
                 nome: String(produtoAtualizado.getNome()) ,
                 descricao:String(produtoAtualizado.getDescricao()),
                 valor: produtoAtualizado.getPreco().getPreco(),
                 data_vencimento: produtoAtualizado.getDataVencimento().getData(),
                 categoria: {
                      id: categoriaProduto[0].id,
                      nome_categoria: categoriaProduto[0].nome_categoria
                 }
                };
    
                return produtoResponse;

        }catch(erro){
            throw new Error(`Erro ao atualizar produto: ${erro.message}`);
    }
    }

}


const produtoService = new ProdutoService();
export default produtoService;