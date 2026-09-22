import { FaBox } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";

function SideBar(){

    const navegation = useNavigate();
    function handleChangeRoute(e){
        switch((e.target.innerText)){
            case "Produto":
                navegation("")
                break;
            case "Categoria":
                navegation("categoria")
                break;
            case "Usuario":
                navegation("usuario")
                break;
        }
       

    }

    return(
        <div className="sideBar">
            <ul>
                <li id="produto" onClick={handleChangeRoute}><FaBox /><p>Produto</p></li>
                <li id="categoria" onClick={handleChangeRoute}><BiSolidCategoryAlt /><p>Categoria</p></li>
                <li id="usuario" onClick={handleChangeRoute}><FaUser /><p>Usuario</p></li>
            </ul>
        </div>
    )
}
export default SideBar;