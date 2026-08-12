const express= require("express");
const {listarUsuarios}=require("./models/usuarioModels");
require("dotenv").config();
const app=express();

const PORT= Number (process.env.PORT || 3000);

app.get("/usuarios", async (req,res)=>{
    try{
        const[usuarios]=await listarUsuarios();
        res.status(200).json(usuarios);

    }catch(error){
        res.status(500).json({"Error":"Você digitou errado"});
    }
  

})

app.listen(PORT,()=>{
    console.log(`Servidor rodando localhost:${PORT}`);
})

