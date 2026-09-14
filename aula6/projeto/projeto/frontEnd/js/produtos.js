const nome=document.getElementById("nome");
const descricao=document.getElementById("descricao");
const valor=document.getElementById("valor");
const data_vencimento=document.getElementById("data_vencimento");
const categoria=document.getElementById("categoria");
const formulario=document.getElementById("product-form");

// quando eu for cadastrar eu vou pegar o submit
const tbody=document.querySelector("tbody");

function validarCampos(){
    if(nome.value=="" || descricao.value=="" || valor.value=="" || data_vencimento.value=="" || categoria.value==""){
        throw new Error("Todos os campos devem ser preenchidos");
    }
}

function validarValor(){
    if(valor.value<=0){
        throw new Error("Valor deve ser maior que zero");
    }
}

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
            console.log(categorias);
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



async function cadastrarProduto(event){
    event.preventDefault();
    try{
        validarCampos();
        validarValor(valor.value);
        console.log("verificar o valor de id da categoria"+categoria.value);
        const produto={
            nome:nome.value,
            descricao:descricao.value,
            valor:valor.value,
            data_vencimento:data_vencimento.value,
            id_categoria:categoria.value
        }
        const response=await fetch('http://localhost:3000/api/produtos',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(produto)
        }
    )
    if(response.ok){
        alert("Produto cadastrado com sucesso");
        carregarProdutos();
    }else{
        throw new Error(response.error + response.status);
        }

    }catch(erro){
        alert("Erro:  " + erro.message);
    }
}

formulario.addEventListener("submit",cadastrarProduto);


carregarCategorias();
carregarProdutos();