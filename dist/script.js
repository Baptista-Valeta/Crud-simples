const container = document.querySelector(".container");
const modal_cadastro = document.querySelector('.section1');

const nome = document.querySelector("#nome")
const numero = document.querySelector("#numero")
const morada = document.querySelector("#morada")
const email = document.querySelector("#email")

const openCadastro = () => {
   modal_cadastro.classList.add('active'); // Adiciona a classe active ao alemento   
   container.classList.add("active");
};

const closeCadastro = (e) => {
   // e.preventDefault();
   modal_cadastro.classList.remove("active");
   container.classList.remove("active");
};

const erro = document.getElementsByClassName("error");

const getList = () => JSON.parse(localStorage.getItem('Banco')) ?? []; // Buscar dados no localStorage
const setList = (banco) => localStorage.setItem('Banco', JSON.stringify(banco));  // Guardar dados no localStorage

const validarForm = (client) => {
   let isValid = true;

   // Validar nome
   if (!nome.value.trim()) {
      nome.style.borderColor = "red";
      erro[0].textContent = "*O nome é obrigatório!";
      erro[0].classList.add("active");

      nome.focus();
      isValid = false;
   }else if(nome.length < 2) {
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
   if (!numero.value) {
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
      erro[2].textContent = "*Informe sua morada!";
      erro[2].classList.add("active");
      isValid = false;
   }else if (morada.length < 4) {
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
      erro[3].textContent = "*Informe seu email!"
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

const deleteClient = (index) => {
   const listClient = Client();
   listClient.splice(index, 1);
   setList(listClient);
}

const updateClient = (index, client) => {
   const listClient = Client();
   listClient[index] = client;
   setList(listClient);
}

const Client = () => getList();

const createClient = (client) => {
   const listClient = getList();
   listClient.push(client);
   setList(listClient);
}

const clearFields = () => {
   const fields = document.querySelectorAll(".dado");
   fields.forEach(field => field.value = "");
   document.querySelector("#nome").dataset.index = "new";
   document.querySelector(".title>h3").textContent = "Novo cliente";
}

const saveClient = (e) => {
   e.preventDefault(); // Impede o envio padrão do formulário
   if (e.type === "click") {
      const client = {
         "nome": nome.value,
         "numero": numero.value,
         "morada": morada.value,
         "email": email.value
      }
      if(validarForm(client) === true) {
         
         const index = document.querySelector("#nome").dataset.index;
         console.log("Cliente cadastrado com sucesso")
         console.log(index)
         if(index === "new") {
            createClient(client);
            updateTable();
            closeCadastro();
         }else {
            updateClient(index, client);
            updateTable();
            closeCadastro();
         }
         nome.innerHTML = "";
         numero.innerHTML = "";
         morada.innerHTML = "";
         email.innerHTML = "";
         setTimeout(() => {
            alert("Operação concluída com sucesso")
         }, 600)
      }
   }


   return; 
}

const createRow = (client, index) => {
   const table = document.querySelector("#table>tbody");
   const item = document.createElement("tr");
   item.innerHTML = `
      <td>${client.nome}</td>
      <td>${client.numero}</td>
      <td>${client.morada}</td>
      <td>${client.email}</td>
      <div class="acoes">
         <button type="button" class="edit" id="editar-${index}" >Editar</button>
         <button type="button" class="remove" id="remover-${index}" >Remover</button>
      </div>
   `
   table.appendChild(item);
}

const clearTable = () => {
   const rows = document.querySelectorAll("#table>tbody tr");
   console.log(rows);
   rows.forEach(row => row.parentNode.removeChild(row));
}

const updateTable = () => {
   const listClient = Client();
   clearTable();
   listClient.forEach(createRow);
}

const fillFieds = (client) => {
   document.querySelector('#nome').value = client.nome;
   document.querySelector('#numero').value = client.numero;
   document.querySelector('#morada').value = client.morada;
   document.querySelector("#email").value = client.email;
   document.querySelector('#nome').dataset.index = client.index;
}

const editClient = (index) => {
   // Captura o elemento e o repectivo indeice do elemento
   const client = Client()[index];
   client.index = index;
   fillFieds(client);
   document.querySelector(".title>h3").textContent = "Editar Cliente " + client.nome;
   openCadastro();
}

const editDelete = (event) => {
   if (event.target.type === 'button') {
      // Captura o elemento id do elemento clicado com event.target.id e transforma em um array separado no ifen(-);
      const [action, index] = event.target.id.split('-');

      if (action === 'editar') {
         editClient(index);
      }else {
         const client = Client()[index];
         const response = confirm(`Deseja realmente remover o cliente ${client.nome}?`);
         if (response) {
            deleteClient(index);
            updateTable();
         }
      }
   }
}

updateTable();

document.querySelector("#openCadastro")
   .addEventListener("click", openCadastro);

document.querySelector("#save").addEventListener("click", saveClient);

document.querySelector("#cancel")
   .addEventListener("click", closeCadastro);

document.querySelector("#table>tbody")
   .addEventListener("click", editDelete);

document.querySelector(".icon-close")
   .addEventListener("click", closeCadastro);