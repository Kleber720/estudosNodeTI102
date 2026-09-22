import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import img_login1 from '../assets/img_login_1.svg'
import "./Login.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login(){

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const navegation=useNavigate()

    function handleLogin(e){
        if(email==="Carlos"&& password==="1234"){
            alert("Seja bem vindo")
            navegation("/cadastrar")
    }else{
        alert("Usuario ou senha incorretos")
    }


    return(
        <>
        <div>
        <img src={img_login1} alt="Imagem de login Azul" />
        <div className="formularioLogin">

            <div className="inputLogin" >
                <MdEmail/>
                
                <input 
                type="email" 
                name="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

            </div>

            <div className="inputLogin">
                <RiLockPasswordFill/>
                <input 
                type="password"
                name="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                

            </div>
            
            <button onClick={handleLogin}>Entrar</button>

            </div>

            <p onClick={handleLogin} className='textoLink'>Cadastrar um novo Usuario</p>

        </div>
        
        </>
        )
    }
}

export default Login;