const nome=document.getElementById("nome");
const descricao=document.getElementById("descricao");
const valor=document.getElementById("valor");
const data_vencimento=document.getElementById("data_vencimento");
const categoria=document.getElementById("categoria");
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

async function carregarCategorias(){
    try{
        //GET para pegar dados da api
        const response=await fetch('http://localhost:3000/api/categorias');
        if(response.ok){
            const categorias=await response.json();
            categoria.innerHTML="";
            categorias.forEach(cate => {
                categoria.innerHTML+=`<option value="${cate.id}">${cate.nome}</option>`
            });
        }else{
            throw new Error(response.error + response.status);
        }
    }catch(erro){
        alert("Erro:  " + erro.message);
    }
}


carregarCategorias();
carregarProdutos();