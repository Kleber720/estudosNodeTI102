import { Preco } from "../valueObjects/preco";
import { DataVencimento } from "../valueObjects/DataVencimento";

export class Produto {
   private id: Number;
   private nome: String;
   private descricao: String;
   private preco:Preco; //valueObject
   private dataVencimento: DataVencimento; //valueObject

   constructor(id: Number, nome: String, descricao: String, preco: Number, dataVencimento: Date) {
       this.id = id;
       this.nome = nome;
       this.descricao = descricao;
       this.preco = new Preco(preco); //valueObject
       this.dataVencimento = new DataVencimento(dataVencimento); //valueObject
   }



getId(): Number {
    return this.id;
   }
getNome(): String {
     return this.nome;
}

setNome(nome: String): void {
     this.nome = nome;
}

getDescricao(): String {
     return this.descricao;
}

setDescricao(descricao: String): void {
     this.descricao = descricao;
}

getPreco(): Preco {
     return this.preco;
}

setPreco(preco:number): void {
     this.preco = new Preco(preco);
}



getDataVencimento(): Date {
     return this.dataVencimento;
}
setDataVencimento(dataVencimento: Date): void {
    
         this.dataVencimento = dataVencimento;


}
}
