const nome=document.getElementById("nome");
const descricao=document.getElementById("descricao");
const valor=document.getElementById("valor");
const data_vencimento=document.getElementById("data_vencimento");
const categoria=document.getElementById("categoria");
// quando eu for cadastrar eu vou pegar o submit
const tbody=document.querySelector("tbody");
const formulario=document.getElementById("product-form");
const addCategoryBtn = document.getElementById('add-category-btn');
const addCategoryModal = document.getElementById('add-category-modal');
const closeModalBtn = document.getElementById('close-modal-btn');

// Abrir o modal
addCategoryBtn.addEventListener('click', () => {
    addCategoryModal.style.display = 'block';
});

// Fechar o modal
closeModalBtn.addEventListener('click', () => {
    addCategoryModal.style.display = 'none';
});

// Fechar o modal ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target === addCategoryModal) {
        addCategoryModal.style.display = 'none';
    }
});

// Lógica para salvar a nova categoria
const categoryForm = document.getElementById('category-form');
categoryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const categoryName = document.getElementById('category-name').value;

    try {
        const response = await fetch('http://localhost:3000/api/categorias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: categoryName })
        });

        if (response.ok) {
            alert('Categoria adicionada com sucesso!');
            addCategoryModal.style.display = 'none';
            document.getElementById('category-name').value = '';
            carregarCategoria(); // Recarregar as categorias
        } else {
            throw new Error('Erro ao adicionar categoria');
        }
    } catch (error) {
        alert('Erro: ' + error.message);
    }
});




// validações de campos

function validarCampos(){
    if(nome.value=="" || descricao.value=="" || valor.value=="" || data_vencimento.value=="" || categoria.value==""){
        throw Error("Todos os campos são obrigatórios");
    }
   
}

function validarValor(valor){ 
    if(valor<=0){
        throw Error("O valor deve ser maior que zero");
    }

}

async function deletarProduto(id) {

    try {

        console.log("Tentando deletar produto:", id);

        const response = await fetch(
            `http://localhost:3000/api/produtos/${id}`,
            {
                method: 'DELETE'
            }
        );

        const dados = await response.json();

        console.log("Resposta do servidor:", dados);

        if (response.ok) {

            alert(dados.mensagem);

            carregarProdutos();

        } else {

            throw new Error(
                dados.erro ||
                dados.mensagem ||
                `Erro HTTP ${response.status}`
            );
        }

    } catch (erro) {

        console.error("Erro ao deletar:", erro);

        alert("Erro ao deletar produto: " + erro.message);
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
                    <td>
                    <button class="delete-btn" onclick="deletarProduto(${produto.id})">🗑️</button>
                     <button class="update-btn" onclick="atualizarProduto(${produto.id})">✏️</button>
                    
                    </td>
                    </tr>`
            });
        }else{
            throw new Error("Erro ao carregar produtos: " + response.status);
        }

    }catch(erro){
        alert("Erro:  " + erro.message);
    }

}

async function carregarCategoria() {
    try{
        // GET para pegar os dados da api
        const response= await fetch('http://localhost:3000/api/categorias');
        if(response.ok){
            const categorias= await response.json();
            categoria.innerHTML="";
            categorias.forEach(cate => {
                categoria.innerHTML+=`<option value="${cate.id}">${cate.nome}</option>`
            });

        }else{
            throw new Error(response.error + response.status);
        }
    }catch(erro){
        alert("Erro: " + erro.message);
    }

    
}

async function cadastrarProduto(e){ 
    e.preventDefault();
    try{
        validarCampos();
        validarValor(valor.value);
        // Dados vindo da tela, sendo organizados em um objeto json
        const produto={
            nome:nome.value,
            descricao:descricao.value,
            valor:valor.value,
            data_vencimento:data_vencimento.value,
            id_categoria:Number(categoria.value)
            
        }
        console.log(produto);

         const response= await fetch('http://localhost:3000/api/produtos',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(produto)
         }
         )
         if(response.ok){
            const produtoCadastrado=await response.json();
            alert(produtoCadastrado.mensagem);
           
            carregarProdutos();
    
        }else{
            throw new Error(response.error + response.status);
        }
    }catch(erro){
        alert("Erro: " + erro);
    }

}

formulario.addEventListener("submit",cadastrarProduto);


carregarCategoria();
carregarProdutos();

