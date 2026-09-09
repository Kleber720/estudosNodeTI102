 export class Categoria{

    private id?:number;
    private nome?:string;

    constructor(nome?:string,id?:number){
        this.id = id;
        this.nome = nome;
    }

    getId():number | undefined{
        return this.id;
    }

    getNome(): string | undefined {
        return this.nome;
    }

    setNome(nome: string): void {
        this.nome = nome;
    }

}