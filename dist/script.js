const container = document.querySelector(".container");
const modal_cadastro = document.querySelector('.section1');

window.document.querySelector("#openCadastro").addEventListener("click", function openCadastro() {
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
   if (!nome.value.trim()) {
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
      nome.style.borderColor="lightgreen";
      erro[0].classList.remove("active");
   }

   // Validar numero
   if (!numero.value.trim()) {
      numero.style.borderColor = "red";
      erro[1].textContent = "*O número é obrigatório!";  
      erro[1].classList.add("active");      
      isValid = false;
   }else if(numero.value.length !== 9) {
      numero.style.borderColor = "red";
      erro[1].textContent = "O número deve ter 9 dígitos!"
      erro[1].classList.add("active");      
      isValid = false;
   }else {
      numero.style.borderColor = "lightgreen"; 
      erro[1].classList.remove("active");
   }

   // Validar morada
   if (!morada.value.trim()) {
      morada.style.borderColor = "red";
      erro[2].textContent = "*A morada é obrigatória!";
      erro[2].classList.add("active");
      isValid = false;
   }else if (morada.value.length < 4) {
      morada.style.borderColor = "red";
      erro[2].textContent = "*A morada deve conter pelo menos 4 caracteres!"
      erro[2].classList.add("active");
      isValid = false;
   }else {
      morada.style.borderColor = "lightgreen";
      erro[2].classList.remove("active");
   }

   // Validar email
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!email.value.trim()) {
      email.style.borderColor = "red";
      erro[3].textContent = "*O email é obrigatório!"
      erro[3].classList.add("active");

      isValid = false;
   }else if (!emailRegex.test(email.value.trim())) {
      email.style.borderColor = "red";
      erro[3].textContent = "*Insira um email válido por favor!"
      erro[3].classList.add("active");

      isValid = false;
   }else {
      email.style.borderColor = "lightgreen";
      erro[3].classList.remove("active");
   }
   return isValid;
}

const salvarDados = (e) => {
   e.preventDefault(); // Impede o envio padrão do formulário
   if (e.type === "click") {
      if(validarForm() !== false) {
         
         // Mensagem de sucesso
         let sucess = document.querySelector('.sucessy');
         sucess.textContent = `Cliente ${nome.value} cadastrado com sucesso!`;
         sucess.classList.add("active");
         setInterval(() => {
            sucess.classList.remove("active");
         }, 3500);
    


      }else {
         // alert("Dados incompletos!")
      }
   }

}

document.querySelector("#save").addEventListener("click", salvarDados);