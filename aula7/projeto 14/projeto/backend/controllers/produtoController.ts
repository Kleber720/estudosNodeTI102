import { Request, Response } from 'express';
import produtoService from '../services/ProdutoService';
import { CriarProdutoDTO } from '../models/dto/CriarProdutoDTO';
import { AtualizarProdutoDTO } from '../models/dto/AtualizarProdutoDTO';


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


export async function atualizarProduto(req: Request, res: Response) {
    try{
        const idProduto=  req.params.id;
       
        const produtoAtualizado:AtualizarProdutoDTO = req.body;

        const produtoaAtualizadoNovo= await produtoService.atualizarProduto(idProduto,produtoAtualizado);

        res.status(200).json({produtoaAtualizadoNovo,mensagem:'Produto atualizado com sucesso'});

    }catch(error){  
        res.status(404).json({ error: 'Erro ao atualizar produto' });
    }
}

export async function deletarProduto(req: Request, res: Response) {

    try{
        const idProduto=  Number(req.params.id);
        await produtoService.deletarProduto(idProduto);
        res.status(200).json({mensagem:'Produto deletado com sucesso'});
    }catch(error){
        res.status(500).json({ error: 'Erro ao deletar produto' });
    }

}