const pool=require("../config/db");


async function listarUsuarios(){
    const [usuarios]= await pool.query("SELECT * FROM usuarios;") //esta falando com o banco de daos para pegar informações
    return usuarios;
}

module.exports={listarUsuarios};