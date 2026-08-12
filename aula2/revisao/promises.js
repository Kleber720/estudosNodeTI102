// function conteudo(novaFuncao){
//     setTimeout(()=>{
//         novaFuncao(10);
//     },2000)
    
//     console.log("estou dentro da função conteudo");
// }


// function contar(numero){
//     let count=0
//     console.log("Estou dentro da função contar");
//     while(count < numero){
//         console.log(count);
//         count++;
//     }
// }

// conteudo(contar)

const promessa= new Promise((res,rej)=>{ //rejeição e um resolver
    const valor=false;
    if(valor){
         res("Deu certo mano")
    }else{
         rej("Deu errado essa merda")
    }
})


try{
    console.log(promessa)
}catch(erro){
    console.log("Erro",erro)
}
