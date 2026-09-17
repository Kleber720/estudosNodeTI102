const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");
const data_vencimento = document.getElementById("data_vencimento");
const categoria = document.getElementById("categoria");
const tbody = document.querySelector("tbody");
const formulario = document.getElementById("product-form");

const addCategoryBtn = document.getElementById('add-category-btn');
const addCategoryModal = document.getElementById('add-category-modal');
const closeModalBtn = document.getElementById('close-modal-btn');

// Elementos do Modal de Atualização
const updateModal = document.getElementById('update-product-modal');
const closeUpdateModalBtn = document.getElementById('close-update-modal-btn');
const updateForm = document.getElementById('update-product-form');
const updateCategoriaSelect = document.getElementById('update-categoria');

let idProdutoEmEdicao = null;

// Controle de fechar modais
closeModalBtn.addEventListener('click', () => addCategoryModal.style.display = 'none');
closeUpdateModalBtn.addEventListener('click', () => updateModal.style.display = 'none');

window.addEventListener('click', (event) => {
    if (event.target === addCategoryModal) addCategoryModal.style.display = 'none';
    if (event.target === updateModal) updateModal.style.display = 'none';
});

addCategoryBtn.addEventListener('click', () => {
    addCategoryModal.style.display = 'block';
});

// Salvar nova categoria
const categoryForm = document.getElementById('category-form');
categoryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const categoryName = document.getElementById('category-name').value;

    try {
        const response = await fetch('http://localhost:3000/api/categorias', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: categoryName })
        });

        if (response.ok) {
            alert('Categoria adicionada com sucesso!');
            addCategoryModal.style.display = 'none';
            document.getElementById('category-name').value = '';
            carregarCategoria();
        } else {
            throw new Error('Erro ao adicionar categoria');
        }
    } catch (error) {
        alert('Erro: ' + error.message);
    }
});

// Preencher selects de categorias (Formulário principal + Modal)
async function carregarCategoria() {
    try {
        const response = await fetch('http://localhost:3000/api/categorias');
        if (response.ok) {
            const categorias = await response.json();
            
            const options = categorias.map(cate => 
                `<option value="${cate.id}">${cate.nome}</option>`
            ).join('');

            categoria.innerHTML = '<option value="" disabled selected>Selecione uma categoria</option>' + options;
            updateCategoriaSelect.innerHTML = '<option value="" disabled selected>Selecione uma categoria</option>' + options;
        } else {
            throw new Error("Erro ao carregar categorias");
        }
    } catch (erro) {
        alert("Erro: " + erro.message);
    }
}

// Carregar lista de produtos
async function carregarProdutos() {
    try {
        const response = await fetch('http://localhost:3000/api/produtos');
        if (response.ok) {
            const produtos = await response.json();
            tbody.innerHTML = "";
            
            produtos.forEach(produto => {
                // Escapar o objeto para passar com segurança no HTML
                const produtoJson = JSON.stringify(produto).replace(/"/g, '&quot;');
                
                tbody.innerHTML += `
                    <tr>
                        <td>${produto.nome}</td>
                        <td>${produto.descricao}</td>
                        <td>${produto.valor}</td>
                        <td>${produto.data_vencimento}</td>
                        <td>${produto.categoria ? produto.categoria.id : 'N/A'}</td>
                        <td>
                            <button class="delete-btn" onclick="deletarProduto(${produto.id})">🗑️</button>
                            <button class="update-btn" onclick="abrirModalAtualizar(${produtoJson})">✏️</button>
                        </td>
                    </tr>`;
            });
        } else {
            throw new Error("Erro ao carregar produtos: " + response.status);
        }
    } catch (erro) {
        alert("Erro: " + erro.message);
    }
}

// Abrir e preencher o modal de atualização
function abrirModalAtualizar(produto) {
    idProdutoEmEdicao = produto.id;

    document.getElementById('update-nome').value = produto.nome;
    document.getElementById('update-descricao').value = produto.descricao;
    document.getElementById('update-valor').value = produto.valor;
    document.getElementById('update-data_vencimento').value = produto.data_vencimento;
    
    if (produto.categoria) {
        updateCategoriaSelect.value = produto.categoria.id;
    }

    updateModal.style.display = 'block';
}

// Enviar atualização para a API
updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const produtoAtualizado = {
        nome: document.getElementById('update-nome').value,
        descricao: document.getElementById('update-descricao').value,
        valor: Number(document.getElementById('update-valor').value),
        data_vencimento: document.getElementById('update-data_vencimento').value,
        id_categoria: Number(updateCategoriaSelect.value)
    };

  


    try {

        
        const response = await fetch(`http://localhost:3000/api/produtos/${idProdutoEmEdicao}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produtoAtualizado)
        });

        const dados = await response.json();
        if (response.ok) {
            alert('Produto atualizado com sucesso!');
            updateModal.style.display = 'none';
            carregarProdutos();
        } else {
            throw new Error('Erro ao atualizar produto');
        }
    } catch (erro) {
        alert("Erro: " + erro.message);
    }
});

// Deletar Produto
async function deletarProduto(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/produtos/${id}`, { method: 'DELETE' });
        const dados = await response.json();

        if (response.ok) {
            alert(dados.mensagem || "Produto excluído");
            carregarProdutos();
        } else {
            throw new Error(dados.erro || dados.mensagem || `Erro HTTP ${response.status}`);
        }
    } catch (erro) {
        alert("Erro ao deletar produto: " + erro.message);
    }
}

// Cadastrar Produto
formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const novoProduto = {
            nome: nome.value,
            descricao: descricao.value,
            valor: Number(valor.value),
            data_vencimento: data_vencimento.value,
            id_categoria: Number(categoria.value)
        };

        const response = await fetch('http://localhost:3000/api/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoProduto)
        });

        if (response.ok) {
            alert('Produto cadastrado com sucesso!');
            formulario.reset();
            carregarProdutos();
        } else {
            throw new Error("Erro ao cadastrar");
        }
    } catch (erro) {
        alert("Erro: " + erro.message);
    }
});

// Inicialização
carregarCategoria();
carregarProdutos();