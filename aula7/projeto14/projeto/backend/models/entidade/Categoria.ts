 export class Categoria{

    private id:number;
    private nome?:string;

    constructor(id:number,nome?:string,){
        this.id = id;
        this.nome = nome;
    }

    getId():number{
        return this.id;
    }

    getNome(): string | undefined {
        return this.nome;
    }

    setNome(nome: string): void {
        this.nome = nome;
    }

}