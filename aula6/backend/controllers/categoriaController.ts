import { Request, Response } from 'express';
import categoriaInfrastructure from '../infrastructure/categoriaInfrasctructure';
import { Categoria } from '../models/entidade/Categoria';

class CategoriaController {
    async criarCategoria(req: Request, res: Response): Promise<Response> {
        try {
            const { nome_categoria } = req.body;
            const categoria = new Categoria(0,nome_categoria);
            const result = await categoriaInfrastructure.criarCategoria(categoria);
            return res.status(201).json({ message: 'Categoria criada com sucesso!', id: result.insertId });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao criar categoria', error: error.message });
        }
    }

    async buscarCategoriaPorId(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const categoria = await categoriaInfrastructure.buscarCategoriaPorId(Number(id));
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            return res.status(200).json(categoria);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar categoria', error: error.message });
        }
    }

    async listarCategorias(req: Request, res: Response): Promise<Response> {
        try {
            const categorias = await categoriaInfrastructure.listarCategorias();
            return res.status(200).json(categorias);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar categorias', error: error.message });
        }
    }

    async atualizarCategoria(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { nome_categoria } = req.body;
            const categoria = new Categoria(0,nome_categoria);
            const result = await categoriaInfrastructure.atualizarCategoria(Number(id), categoria);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            return res.status(200).json({ message: 'Categoria atualizada com sucesso' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar categoria', error: error.message });
        }
    }

    async deletarCategoria(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const result = await categoriaInfrastructure.deletarCategoria(Number(id));
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            return res.status(200).json({ message: 'Categoria deletada com sucesso' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao deletar categoria', error: error.message });
        }
    }
}

const categoriaController = new CategoriaController();
export { categoriaController };
export default categoriaController;