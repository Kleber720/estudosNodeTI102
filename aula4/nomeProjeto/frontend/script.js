
const nome= document.querySelector("#nome");

const email= document.querySelector("#email");

const senha= document.querySelector("#senha");

const tabela=document.querySelector("tbody");

 

async function listarUsuarios() {

 

    const resposta= await fetch("http://localhost:3000/usuarios");

    if(resposta.ok){

        const dados= await resposta.json();

        dados.forEach(usuario => {

            tabela.innerHTML+= `<tr>

                                    <td>${usuario.id}</td>

                                    <td>${usuario.nome}</td>

                                    <td>${usuario.email}</td>

                                    <td>${usuario.senha}</td>

                                    <td>botões</td>

                                </tr>`

        });

       

    }

 

   

};

 

 

 

 

document.querySelector("form").addEventListener("submit",async (e)=>{

    e.preventDefault();

 

        const dados={nome:nome.value , email: email.value,senha:senha.value}

 

       const resposta= await fetch("http://localhost:3000/usuarios",{

            method:"POST",

            headers:{

                'Content-Type': 'application/json'

            },

           

            body: JSON.stringify(dados)

        })

        if(resposta.ok){

            const mensagem= await resposta.json()

            alert(mensagem.mensagem)

        }else{

            alert("Não deu para salvar o usuario")

        }

 

    }

 

 

);

 

 

listarUsuarios()


