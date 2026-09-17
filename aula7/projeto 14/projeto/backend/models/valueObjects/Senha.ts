class Senha {
    private senha: string;

    constructor(senha: string) {
        if (!this.validadorSenha(senha)) {
            throw new Error('Senha inválida. A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
        }
        this.senha = senha;
    }

    private validadorSenha(senha: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(senha);
    }

    getValue(): string {    
        return this.senha;
    }

    
    equals(other: Senha): boolean {
        return this.senha === other.senha;
    }
}

export default Senha;