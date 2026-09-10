import { Categoria } from "../models/entidade/Categoria";
import { ListarCategoriaDTO } from "../models/dto/categoria/ListarCategoriaDTO";
import { CadastrarCategoriaDTO } from "../models/dto/categoria/CadastrarCategoriaDTO";
import categoriaInfrastructure from "../infrastructure/categoriaInfrasctructure";

class CategoriaService{

    public tratarNome(nome: String): string{    
            
            return nome.trim().toUpperCase();
    }

   async listarCategorias(): Promise<ListarCategoriaDTO[]> {
    try{
        const categorias = await categoriaInfrastructure.listarCategorias();
        const categoriasResponse: ListarCategoriaDTO[] = [];

        for (const categoria of categorias) {
            const categoriaResponse: ListarCategoriaDTO = {
                id: categoria.id,
                nome: categoria.nome
            };

            categoriasResponse.push(categoriaResponse);
        }

        return categoriasResponse;
    }catch (erro) {     

        throw new Error(`Erro ao listar categorias: ${erro.message}`);
    }
   }

   async criarCategoria(categoriaDTO: CadastrarCategoriaDTO): Promise<ListarCategoriaDTO> {
    try{
        //implementar uma camada para tratar os erros de entrada 
        const validarNome = await categoriaInfrastructure.buscarCategoriaPorNome(this.tratarNome(categoriaDTO.nome));

        if(validarNome.length > 0){
            throw new Error('Categoria já existe');
        }

        // A partir daqui eu vou trabalhar as regras de negocio de categoria
        const categoria = new Categoria(categoriaDTO.nome);
        const id = await categoriaInfrastructure.criarCategoria(categoria);
        

        const categoriaResponseDTO:ListarCategoriaDTO={
                
                id: id,
                nome: categoriaDTO.nome
        }

        return  categoriaResponseDTO ;

    }catch (erro) {     

        throw new Error(`Erro ao criar categoria: ${erro.message}`);
    }
   }


   async buscarCategoriaPorNome(nome: string): Promise<ListarCategoriaDTO> {
    try{
        const categoria = await categoriaInfrastructure.buscarCategoriaPorNome(this.tratarNome(nome));

        if(categoria.length === 0){
            throw new Error('Categoria não encontrada');
        }

        const categoriaResponseDTO:ListarCategoriaDTO={
                
                id: categoria[0].id,
                nome: categoria[0].nome_categoria
        }

        return  categoriaResponseDTO ;

    }catch (erro) {     

        throw new Error(`Erro ao buscar categoria: ${erro.message}`);
    }
   }


   async buscarCategoriaPorId(id: Number): Promise<ListarCategoriaDTO> {
    try{
        const categoria = await categoriaInfrastructure.buscarCategoriaPorId(id);

        if(categoria.length === 0){
            throw new Error('Categoria não encontrada');
        }

        const categoriaResponseDTO:ListarCategoriaDTO={
                
                id: categoria[0].id,
                nome: categoria[0].nome
        }

        return  categoriaResponseDTO ;

    }catch (erro) {     

        throw new Error(`Erro ao buscar categoria: ${erro.message}`);

   }
   

}
}

const categoriaService = new CategoriaService();
export default categoriaService;