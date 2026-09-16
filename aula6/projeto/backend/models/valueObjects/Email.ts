class Email {

    private email: string;

    constructor(email: string) {
        this.email = email;

        if (!this.validadorEmail()) {
            throw new Error('Email inválido');
        }
    }

    getValue(): string {
        return this.email;
    }

    validadorEmail(): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(this.email);
    }

    equals(other: Email): boolean {
        return this.email === other.email;
    }
}





export default Email;

