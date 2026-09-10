import { Pessoa } from "./Pessoa";

class Usuario extends Pessoa {
    email: string;
    senha: string;

    constructor(nome: string, idade: number, cpf: string, email: string, senha: string) {
        super(nome, idade, cpf);
        this.email = email;
        this.senha = senha;
    }
    
}