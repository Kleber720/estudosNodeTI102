import { Categoria } from "../models/entidade/Categoria";
export interface CategoriaRepository {         
    
        criarCategoria(categoria: Categoria): Promise<any>;
        buscarCategoriaPorId(id: Number): Promise<any>;
        listarCategorias(): Promise<any>;
        atualizarCategoria(id: Number, categoria: Categoria): Promise<any>;
        deletarCategoria(id: Number): Promise<any>;
    
}