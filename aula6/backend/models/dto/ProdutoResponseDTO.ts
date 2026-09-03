export interface ProdutoResponseDTO {
    id: Number;
    nome: string;
    descricao: string;
    valor: number;
    dataVencimento: Date;
    categoria: {
        id: number;
        nomeCategoria: string;
    }
}