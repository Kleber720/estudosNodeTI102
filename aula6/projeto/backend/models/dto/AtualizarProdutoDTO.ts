export interface AtualizarProdutoDTO {
    nome?: string;
    descricao?: string;
    valor?: number;
    quantidade?: number;
    data_vencimento?: Date;
    id_categoria?: number;
}