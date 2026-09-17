export class Preco {
    private preco: number;

    constructor(preco: number) {
        this.validatePreco(preco);
        this.preco = preco;
    }

    getPreco(): number {
        return this.preco;
    }

    private validatePreco(preco: number): void {
        if (preco < 0) {
            throw new Error("Preço não pode ser negativo");
        }
    }

    equal(preco: Preco): boolean {
        return this.preco === preco.getPreco();
    }
}

