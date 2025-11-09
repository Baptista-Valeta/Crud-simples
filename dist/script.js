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


const nome = document.querySelector('#nome');
const numero = document.querySelector('#numero');
const morada = document.querySelector('#morada');
const email = document.querySelector("#email");

const erro = document.getElementsByClassName("error");

const validarForm = () => {
   let isValid = true;

   // Validar nome
   if (!nome.value) {
      nome.style.borderColor = "red";
      erro[0].textContent = "*O nome é obrigatório!";
      erro[0].classList.add("active");

      nome.focus();
      isValid = false;
   }else if(nome.value.length < 2) {
      nome.style.borderColor = "red";
      erro[0].textContent = "*O nome deve ter no mínimo 2 caracteres!";
      erro[0].classList.add("active");

      nome.focus();
      isValid = false;
   }else {
      nome.style.borderColor="green";
      erro[0].classList.remove("active");
   }

   // Validar numero
   if(numero.value.length !== 9) {
      numero.style.borderColor = "red";
      erro.textContent = "O número deve ter 9 car"
   }else {
      numero.style.borderColor = "green"; 
   }

   return true;
}

const salvarDados = (e) => {
   e.preventDefault(); // Impede o envio padrão do formulário
   if (e.type === "click") {
      if(validarForm() === true) {
         console.log("Pronto para enviar os dados preenchidos!");

      }else {
         console.error("Dados incompletos!")
      }
   }

}

document.querySelector("#save").addEventListener("click", salvarDados);