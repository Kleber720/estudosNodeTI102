import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import img_login1 from '../assets/img_login_1.svg'
import "./Login.css"
function Login(){
    return(
        <>
        <div>
        <img src={img_login1} alt="Imagem de login Azul" />
        <div className="formularioLogin">

            <div className="inputLogin" >
                <MdEmail/>
                
                <input type="email" name="email" id="email" />

            </div>

            <div className="inputLogin">
                <RiLockPasswordFill/>
                <input type="password" name="password" id="password" />
            </div>
            
            <button>Entrar</button>

            </div>

        </div>
        
        </>
    )
}

export default Login;