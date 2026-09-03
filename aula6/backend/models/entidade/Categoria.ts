 export class Categoria{

    private id?:number;
    private nome:String;

    constructor(nome:String,id?:number){
        this.id = id;
        this.nome = nome;
    }

    getId():number | undefined{
        return this.id;
    }

    getNome(): String {
        return this.nome;
    }

    setNome(nome: String): void {
        this.nome = nome;
    }

}