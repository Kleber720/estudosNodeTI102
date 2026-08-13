class Usuario{

    #nome
    #email
    #telefone
    constructor(nome,email,telefone){
        this.#nome=nome
        this.#email=email
        this.#telefone=telefone

   
}

    get nome(){
        return this.#nome;
    }

    set nome(newNome){
        this.#nome=newNome
    }
    

}