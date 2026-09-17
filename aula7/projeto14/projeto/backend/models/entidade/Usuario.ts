import Email from "../valueObjects/Email";
import Senha from "../valueObjects/Senha";

class Usuario{

    private id: number;
    private nome: string;
    private email: Email;
    private senha: Senha;

    constructor(nome: string, email: string, senha: string, id?: number) {
        this.nome = nome;
        this.email =  new Email(email);
        this.senha = new Senha(senha);
        if (id) {
            this.id = id;
        }

    }   
    public getEmail(): Email {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email =  new Email(email)
    }

    public getSenha(): Senha {
        return this.senha;
    }

    public setSenha(senha: string): void {
        this.senha =  new Senha(senha)
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getId(): number {
        if (!this.id) {
            throw new Error('ID não foi definido.');
        }
        return this.id;
    }           

    public getNome(): string {  
            
            return this.nome;
        }


}

export default Usuario;