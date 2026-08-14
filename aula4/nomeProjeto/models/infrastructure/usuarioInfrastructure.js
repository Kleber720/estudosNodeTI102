const pool=require("../../config/database");
const Usuario=require("../entities/usuarioEntity");

async function listarUsuarios() {
    
    const[resposta]=await pool.query("SELECT * FROM usuarios;") //consulta sql
    const usuarios =resposta.map((usuario)=>{
        
           return new Usuario(
                usuario.id,
                usuario.nome,
                usuario.senha,
                usuario.email
            )
        )
    }
    
}

async function cadastrarUsuario(nome,senha,email){

    const resposta=await pool.query("INSERT INTO usuarios(nome,senha,email)VALUES(?,?,?);",[nome,senha,email]); //evitar ataques no sql

    return resposta.affectedRows>0
}

module.exports={listarUsuarios,cadastrarUsuario};