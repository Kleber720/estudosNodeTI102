export class DataVencimento{
    private dataVencimento: Date;

    constructor(dataVencimento: Date){
        this.validateDataVencimento(dataVencimento); //so ira construir o objeto se a data for valida
        this.dataVencimento = dataVencimento;
    }

    getDataVencimento(): Date{
        return this.dataVencimento;
    }

    private validateDataVencimento(dataVencimento: Date): boolean{
        const now = new Date();
        if(dataVencimento < now){
            throw new Error("Data de vencimento não pode ser no passado");
        }
        return true;
    }
    equal(dataVencimento: DataVencimento): boolean{
        return this.dataVencimento.getTime() === dataVencimento.getDataVencimento().getTime();
    }
}