const container = document.querySelector(".container");
const modal_cadastro =    document.querySelector('.section1');

window.document.querySelector("#openCadastro").addEventListener("click", function() {
   modal_cadastro.classList.add('active'); // Adiciona a classe active ao alemento   
   container.classList.add("active");
});

document.querySelector(".icon-close").addEventListener("click", () => {
   modal_cadastro.classList.remove("active");
   container.classList.remove("active");
});




// function cadastrar() {
//    const nome = document.querySelector('#nome');
//    const numero = document.querySelector('#numero');
//    const morada = document.querySelector('#morada');

//    if (nome.value === '' || numero.value === '' || morada.value === '') {
//       const caixaError = document.querySelector('.error').style.display = 'block';
      
//       // Adicionar a mensagem de erro ...

//    }else {
//       const table = document.getElementsByTagName("tbody")[0];
//       const table_list = document.createElement("tr");
   
//       console.log(nome.value, numero.value, morada.value)
   
//       table_list.innerHTML = `
//          <td>${nome.value}</td>
//          <td>${numero.value}</td>
//          <td>${morada.value}</td>
//          <></>
//       `;
   
//       table.appendChild(table_list);

//    }
// }

const save = document.querySelector("#save").addEventListener("click", () => {
   const nome = document.querySelector('#nome').value;
   const numero = document.querySelector('#numero').value;
   const morada = document.querySelector('#morada').value;
   const email = document.querySelector("#email").value;

   if(!nome || !numero || !morada || !email) {
      alert ("Dados incompletos");
   }
});

