class Carro{

 

    //Método
    #token;
    constructor(id,marca,modelo,placa){
        // protect private public

        this.id=id;
        this.marca=marca;
        this.modelo=modelo;
        this.placa=placa;
        this.#token="23445"

    }

    parar(){

        console.log("O carro esta parado !")

    }

    informacoesCarro(){
        return `marca: ${this.marca} modelo: ${this.modelo}`
    }

    get token(){
        return this.#token;
    }

    set token(newToken){
        this.#token=newToken;
    }

};

 

const carro1= new Carro(1,"Fiat","Siena","AAA-2345");

carro1.placa,

carro1.modelo;

console.log(carro1.token)

carro1.parar()
console.log(carro1.informacoesCarro());


