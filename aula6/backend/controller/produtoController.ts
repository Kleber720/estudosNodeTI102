import {request,response} from 'express';
import {ProdutoInfrastructure} from '../infrastructure/produtoInfrastructure';

const produtos =[
    {id:1,nome:"Produto 1",preco:10},
    {id: 2, nome: 'Produto 2', preco:20}
]

export function getProduto(req:Request, res:Response){
    const id= req.params.id;
    const [resposta]=ProdutoInfrastructure.buscarProdutoPorId(id);
    res.status(200).json(resposta);

}