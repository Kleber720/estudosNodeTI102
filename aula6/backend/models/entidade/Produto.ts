import { Preco } from "../valueObjects/Preco";
import { DataVencimento } from "../valueObjects/DataVencimento";
import { Categoria } from "./Categoria";

export class Produto{

    private id?:number;
    private nome:String;
    private descricao:String;
    private preco:Preco; // ValueObject
    private dataVencimento:DataVencimento; // ValueObject
    private categoria:Categoria;
    
    constructor( nome:String, descricao:String, preco:number, dataVencimento:Date, categoria:Categoria, id?:number){
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = new Preco(preco);
        this.dataVencimento = new DataVencimento(dataVencimento);
        this.categoria = categoria;

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

    getDescricao(): String {
        return this.descricao;
    }

    setDescricao(descricao: String): void {
        this.descricao = descricao;
    }

    getPreco(): Preco {
        return this.preco;
    }

    setPreco(preco: number): void {
        this.preco = new Preco(preco);
    }
 

    getDataVencimento(): DataVencimento {
        return this.dataVencimento;
    }

    setDataVencimento(dataVencimento: Date): void {
        this.dataVencimento = new DataVencimento(dataVencimento);
    }

    getCategoria(): Categoria {
        return this.categoria;
    }

    setCategoria(categoria: Categoria): void {
        this.categoria = categoria;
    }


}

const p= new Produto( "Produto 1", "Descrição do produto 1", 10.5, new Date("2026-12-31"), new Categoria("Categoria 1"));

console.log(p.getId()); 

