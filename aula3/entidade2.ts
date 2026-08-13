class Pessoa{
    private nome:string;
    

    constructor(nome:string){
        this.nome=nome;
        
    }

    public getNome():string{
        return this.nome
    }

    public setNome(newNome:string):void{
        this.nome=newNome;
    }

}


class Usuario extends Pessoa{
    protected id:number;
    public senha:string;
    private email:string;

    constructor(id:number,senha:string,email:string,nome:string){
        super(nome)
        this.id=id
        if(!this.validarSenha(senha)){
            throw new Error("A senha esta errada")
        }
        this.senha=senha
        this.email=email
    }

   

    public validarSenha(senha:string):boolean{
        if(senha.length>6){
            return true
        }else{
            return false;
        }
    }
};




try{
    const usuario=new Usuario(1,"12345","email@gmail","carlos");
}catch(erro){
    console.log("erro",erro)
}


