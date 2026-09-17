export class DataVencimento {
    private data: Date;

    constructor(data: Date) {
        this.validateData(data);
        this.data = data;
    }

    getData(): Date {
        return this.data;
    }

    private validateData(data: Date): void {
        const hoje = new Date();
        if (data < hoje) {
            throw new Error("A data de vencimento não pode ser no passado.");
        }
    }

    equals(dataVencimento: DataVencimento): boolean {
        return this.data.getTime() === dataVencimento.getData().getTime();
    }
}

