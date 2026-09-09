import {Pessoa} from "../estudo/Pessoa";

class FuncionarioGerente extends Pessoa implements FuncionarioADM {
    cargo: string;
    salario: number;

    constructor(nome: string, idade: number, cpf: string, cargo: string, salario: number) {
        super(nome, idade, cpf);
        this.cargo = cargo;
        this.salario = salario;
    }
    gerenciarFuncionario(setor: String): void {
        console.log(`Gerenciando o setor: ${setor}`);
    }

}