const express=require("express");
const cors=require("cors");
const usuarioInfrastructure=require("./models/infrastructure/usuarioInfrastructure");
require("dotenv").config();
const app=express();
app.use(express.json());
app.use(cors());
const PORT= Number (process.env.PORT || 3000);

app.get("/usuarios",async(req,resp)=>{

    const usuarios=await usuarioInfrastructure.listarUsuarios()
    resp.status(200).json(usuarios)

})

app.post("/usuarios", async (req,resp)=>{
    try{
        const {nome,email,senha}= req.body;
        usuarioInfrastructure.cadastrarUsuario(nome,email,senha);
        resp.status(200).json({"mensagem":"USUARIO CADASTRADO COM SUCESSO!"})
    }catch(erro){
        console.log("ERRO AO CADASTRAR USUARIO!")
        resp.status(500).json({"mensagem":"ERRO AO CADASTRAR USUARIO!"})
    }
    
    
});

app.listen(PORT,()=>{
    console.log(`O servidor está rodando: http://localhost:${PORT}`);
})