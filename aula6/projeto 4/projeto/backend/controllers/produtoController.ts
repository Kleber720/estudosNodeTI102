import { Request, Response } from 'express';
import produtoService from '../services/ProdutoService';
import { CriarProdutoDTO } from '../models/dto/CriarProdutoDTO';


export async function listarProdutos(req: Request, res: Response) { 
    try{
        const produtos = await produtoService.listarProdutos();
        res.status(200).json(produtos);
    }catch(error){  
        console.error('Erro ao listar produtos:', error);
        res.status(500).json({ error: 'Erro ao listar produtos' });
    }

}


export async function criarProduto(req: Request, res: Response) {
    try{
        const produto:CriarProdutoDTO = req.body;
        const novoProduto= await produtoService.criarProduto(produto);
        res.status(201).json({novoProduto,mensagem:'Produto criado com sucesso'});
       
  
    }catch(error){
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
    
}

// export async function buscarProdutoPorId(req: Request, res: Response){

//     try{
//         const id= Number(req.params.id);
//         const produto= await produtosInfrastructure.buscarProdutoPorId(id);
//         res.status(200).json(produto);
//     }catch(erro){
//         console.error('Erro ao buscar produto:', erro);
//         res.status(500).json({ error: 'Erro ao buscar produto' });
//     }

// }

// export async function atualizarProduto(req: Request, res: Response){

//     try{
//         const id= parseInt(req.params.id);
//         const produto= req.body;
//         const newProduto= new Produto(id, produto.nome, produto.descricao, produto.valor, produto.data_vencimento, produto.id_categoria);

//         const resultado= await produtosInfrastructure.atualizarProduto(id, newProduto);
        
//         if(!resultado){
//             res.status(400).json({ error: 'Não foi possível atualizar o produto' });
//         }
//         res.status(200).json({ message: 'Produto atualizado com sucesso'});
//     }catch(error){
//         console.error('Erro ao atualizar produto:', error);
//         res.status(500).json({ error: 'Erro ao atualizar produto' });
//     }

// }

// export async function atualizarProdutoParcial(req: Request, res: Response){

//     try{
//         const id= parseInt(req.params.id);
//         const produto= req.body;
//         const newProduto= new Produto(id, produto.nome, produto.descricao, produto.valor, produto.data_vencimento, produto.id_categoria);

//         const resultado= await produtosInfrastructure.atualizarProdutoParcial(id, newProduto);
        
//         if(!resultado){
//             res.status(400).json({ error: 'Não foi possível atualizar o produto' });
//         }
//         res.status(200).json({ message: 'Produto atualizado com sucesso'});
//     }catch(error){
//         console.error('Erro ao atualizar produto:', error);
//         res.status(500).json({ error: 'Erro ao atualizar produto' });
//     }

// }

// export async function deletarProduto(req: Request, res: Response){

//     try{
//         const id= parseInt(req.params.id);
//         const resultado= await produtosInfrastructure.deletarProduto(id);
        
//         if(!resultado){
//             res.status(400).json({ error: 'Não foi possível deletar o produto' });
//         }
//         res.status(200).json({ message: 'Produto deletado com sucesso'});
//     }catch(error){
//         console.error('Erro ao deletar produto:', error);
//         res.status(500).json({ error: 'Erro ao deletar produto' });
//     }

// }