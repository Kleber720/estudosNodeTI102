
export class UsuarioEntitie{
   private id?:Number
   private nome:string
   private email:string
   private senha:string

    constructor(nome:string,email:string,senha:string,id?:number){
        this.id = id
        this.nome = nome
        this.email = email
        this.senha = senha
    }

    getId():Number{
            
            return this.id
        }
    setId(id:Number):void{
            this.id = id
        }
    
    getNome():string{
        return this.nome
    }
    setNome(nome:string):void{
        this.nome = nome
    }
    
    getEmail():string{
        return this.email
    }
    setEmail(email:string):void{
        this.email = email
    }

    getSenha():string{
        return this.senha
    }
    setSenha(senha:string):void{
        this.senha = senha
    }
    

}