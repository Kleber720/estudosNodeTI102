const pool= require("../../config/database");
const Usuario= require("../entities/usuarioEntity");

async function listarUsuarios() {

    try{
        const [resposta]= await pool.query("SELECT * FROM usuarios;");

        const usuarios = resposta.map((usuario)=>{
           
               return new Usuario(
                   usuario.id,
                   usuario.nome,
                   usuario.email,
                   usuario.senha 
            )
         }) 
    
         return usuarios;
    }catch{
        console.error("esta aqui")
    }
    
}


async function cadastrarUsuario(nome, email,senha) {

    const resposta = await pool.query("INSERT INTO   usuarios(nome,email,senha) values(?,?,?);",[nome,email,senha]);

    return resposta.affectedRows>0;
    
}

module.exports={listarUsuarios,cadastrarUsuario};

        


