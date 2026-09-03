export interface CriarProdutoDTO { 
    nome: string;
    descricao: string;
    valor: number;
    data_vencimento: Date;
    id_categoria: number;
}