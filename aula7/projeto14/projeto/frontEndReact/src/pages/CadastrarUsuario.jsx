import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoChevronBackCircle } from "react-icons/io5";
import "./CadastrarUsuario.css"
import { useState } from "react";
 
function CadastrarUsuario(){

    const[nome,setNome]=useState("");
    const[email,setEmail]=useState(""); //pegar dados que ela digitar no input e armazenar na variavel email
    const[password,setPassword]=useState("");
    console.log("o valor de nome:",nome);
    console.log("o valor de email:",email);
    return(
        <div className="containerCadastrarUsuario">
            <form>
                <div className="inputCadastrarUsuario">
                    <MdDriveFileRenameOutline className="iconCadastrar" />

                    <input 
                    type="text" 
                    placeholder="Nome" 
                    value={nome}
                    onChange={(e)=>setNome(e.target.value)}
                    />
                </div>
 
                <div className="inputCadastrarUsuario">
                    <MdAlternateEmail  className="iconCadastrar" />
                    <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
 
                <div className="inputCadastrarUsuario">
                    <RiLockPasswordLine className="iconCadastrar"  />
                    <input 
                    type="password" 
                    placeholder="Senha" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
 
                <div className="navegacaoCadastrarUsuario">
                    <IoChevronBackCircle className="voltar"  />
                    <button type="submit">Cadastrar</button>
                </div>
               
 
            </form>
 
       
        </div>
    )
 
}
 
 
export default CadastrarUsuario;