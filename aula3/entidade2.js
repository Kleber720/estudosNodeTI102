"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    id;
    nome;
    senha;
    email;
    constructor(id, nome, senha, email) {
        this.id = id;
        this.nome = nome;
        this.senha = senha;
        this.email = email;
    }
    validarSenha(senha) {
        if (senha.length > 6) {
            return true;
        }
        else {
            return false;
        }
    }
}
;
const u1 = new Usuario(1, "CARLOS", "1234", "KLEB");
console.log(u1.senha);
//# sourceMappingURL=entidade2.js.map