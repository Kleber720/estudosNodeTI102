import { Router } from 'express';

import { listarProdutos, criarProduto,atualizarProduto } from '../controllers/produtoController';

const routerProduto = Router();

routerProduto.get('/produtos', listarProdutos);

routerProduto.post('/produtos', criarProduto);
routerProduto.put('/produtos/:id', atualizarProduto);

export default routerProduto;