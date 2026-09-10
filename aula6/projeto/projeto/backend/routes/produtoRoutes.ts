import { Router } from 'express';

import { listarProdutos, criarProduto } from '../controllers/produtoController';

const routerProduto = Router();

routerProduto.get('/produtos', listarProdutos);

routerProduto.post('/produtos', criarProduto);

export default routerProduto;