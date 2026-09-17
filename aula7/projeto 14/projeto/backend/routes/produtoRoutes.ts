import { Router } from 'express';

import { listarProdutos, criarProduto,atualizarProduto,deletarProduto } from '../controllers/produtoController';

const routerProduto = Router();

routerProduto.get('/produtos', listarProdutos);
routerProduto.post('/produtos', criarProduto);
routerProduto.put('/produtos/:id', atualizarProduto);
routerProduto.delete('/produtos/:id', deletarProduto);

export default routerProduto;