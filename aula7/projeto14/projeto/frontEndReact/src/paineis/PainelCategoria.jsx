import "./PainelCategoria.css"
function PainelCategoria(){
    return(
        <>
        <div className="containerMain">
            <div className="registrar">
                <h1>Registrar Categoria</h1>
                <input type="text" placeholder="nome" id="nome"/>

                
            </div>

            <div className="categorias">
                <ul>
                    <li id="categoria">Nome</li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default PainelCategoria;