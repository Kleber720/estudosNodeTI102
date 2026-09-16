export interface ProdutoResponseDTO {
    id: number;
    nome: string;
    descricao: string;
    valor: number;
    data_vencimento: Date;
    categoria: {
        id: number;
        nome_categoria: string;
    };
}