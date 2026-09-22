function PainelProduto(){
    return(
        <form>
            <h2>Produtos</h2>
            <div className="dadosProduto">
                <input type="text" placeholder="Nome do produto" id="nome" />

                <input type="text" placeholder="Descrição" id="descricao" />

                <input type="number" placeholder="Valor " id="valor" />

                <input type="date" name="data" id="data" />

                <select name="" id="categoria">
                    <option value="">Escolha a categoria</option>
                    <option value="categoria">categoria</option>
                    <option value="categoria2">categoria2</option>
                    <option value="categoria3">categoria3</option>
                    <option value="categoria4">categoria4</option>
                </select>

            </div>

            <button>Cadastrar</button>

        </form>
    );
}

export default PainelProduto;