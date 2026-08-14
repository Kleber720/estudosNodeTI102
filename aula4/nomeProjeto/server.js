const express=require("express");
const usuarioInfrastructure=require("./models/infrastructure/usuarioInfrastructure");
require("dotenv").config();
const app=express();
app.use(express.json());
const PORT= Number (process.env.PORT || 3000);

app.get("/usuarios",async(req,resp)=>{

    const usuarios=await usuarioInfrastructure.listarUsuarios()
    resp.status(200).json(usuarios)

})

app.listen(PORT,()=>{
    console.log(`O servidor está rodando: http://localhost:${PORT}`);
})