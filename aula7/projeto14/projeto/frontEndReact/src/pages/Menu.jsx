import "./Menu.css"
import "../components/SideBar"
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";


function Menu(){
    return(
        <div className="containerMenu">

            <SideBar/>

            <div className="paineis">
                <Outlet/>
            </div>

        </div>
    )

}
export default Menu;