const nome=document.getElementById("nome");
const descricao=document.getElementById("descricao");
const valor=document.getElementById("valor");
// quando eu for cadastrar eu vou pegar o submit
const tbody=document.querySelector("tbody");

async function carregarProdutos(){

    try{
        const response=await fetch('http://localhost:3000/api/produtos');
        if(response.ok){
            const produtos=await response.json();
            tbody.innerHTML="";
            produtos.forEach(produto => {
                tbody.innerHTML+=`<tr>
                    <td>${produto.nome}</td>
                    <td>${produto.descricao}</td>
                    <td>${produto.valor}</td>
                    <td>${produto.data_vencimento}</td>
                    <td>${produto.categoria.id}</td>
                    </tr>`
            });
        }else{
            throw new Error("Erro ao carregar produtos: " + response.status);
        }

    }catch(erro){
        alert("Erro:  " + erro.message);
    }

}

carregarProdutos();