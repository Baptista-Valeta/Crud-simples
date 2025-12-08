// ===============================
// Seletores Globais
// ===============================
const container = document.querySelector(".container");
const modal_cadastro = document.querySelector(".section1");

const nome = document.querySelector("#nome");
const numero = document.querySelector("#numero");
const morada = document.querySelector("#morada");
const email = document.querySelector("#email");

const erros = document.querySelectorAll(".error");

// ===============================
// Funções Auxiliares
// ===============================
const getList = () => JSON.parse(localStorage.getItem("Banco")) ?? [];
const setList = (list) => localStorage.setItem("Banco", JSON.stringify(list));

// Mostrar modal
const openCadastro = () => {
  modal_cadastro.classList.add("active");
  container.classList.add("active");
};

container.ondblclick = () => {
  closeCadastro();
} 

// Fechar modal
const closeCadastro = (e) => {
  modal_cadastro.classList.remove("active");
  container.classList.remove("active");
};

// Mostrar erro padrão
const showError = (input, errorElement, message) => {
  input.style.borderColor = "red";
  errorElement.textContent = message;
  errorElement.classList.add("active");
};

// Remover erro
const clearError = (input, errorElement) => {
  input.style.borderColor = "black";
  errorElement.classList.remove("active");
};

// ===============================
// Validação do formulário
// ===============================
const validarForm = () => {
  let isValid = true;

  // Validar nome
  if (!nome.value.trim()) {
    showError(nome, erros[0], "*O nome é obrigatório!");
    isValid = false;
  } else if (nome.value.length < 2) {
    showError(nome, erros[0], "*O nome deve ter no mínimo 2 caracteres!");
    isValid = false;
  } else {
    clearError(nome, erros[0]);
  }

  // Validar número
  if (!numero.value.trim()) {
    showError(numero, erros[1], "*O número é obrigatório!");
    isValid = false;
  } else if (numero.value.length !== 9) {
    showError(numero, erros[1], "*O número deve ter 9 dígitos!");
    isValid = false;
  } else {
    clearError(numero, erros[1]);
  }

  // Validar morada
  if (!morada.value.trim()) {
    showError(morada, erros[2], "*A morada é obrigatória!");
    isValid = false;
  } else if (morada.value.length < 4) {
    showError(morada, erros[2], "*A morada deve conter pelo menos 4 caracteres!");
    isValid = false;
  } else {
    clearError(morada, erros[2]);
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    showError(email, erros[3], "*Informe o email!");
    isValid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    showError(email, erros[3], "*Insira um email válido!");
    isValid = false;
  } else {
    clearError(email, erros[3]);
  }

  return isValid;
};

// ===============================
// CRUD LOCALSTORAGE
// ===============================
const createClient = (client) => {
  const list = getList();
  list.push(client);
  setList(list);
};

const updateClient = (index, client) => {
  const list = getList();
  list[index] = client;
  setList(list);
};

const deleteClient = (index) => {
  const list = getList();
  list.splice(index, 1);
  setList(list);
};

// ===============================
// Formulário
// ===============================
const clearFields = () => {
  document.querySelectorAll(".dado").forEach((el) => (el.value = ""));
  nome.dataset.index = "new";
  document.querySelector(".title h3").textContent = "Novo Cliente";
};

// Salvar cliente
const saveClient = (e) => {
  e.preventDefault();

  if (!validarForm()) return;

  const client = {
    nome: nome.value,
    numero: numero.value,
    morada: morada.value,
    email: email.value,
  };

  const index = nome.dataset.index;

  if (index === "new") {
    createClient(client);
  } else {
    updateClient(index, client);
  }

  updateTable();
  closeCadastro();

  clearFields();

  // client.nome = ""
  // client.morada = ""
  // client.numero = ""
  // client.email = ""

  setTimeout(() => alert("Operação concluída com sucesso"), 600);
};

// ===============================
// Tabela
// ===============================
const createRow = (client, index) => {
  const table = document.querySelector("#table tbody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.numero}</td>
    <td>${client.morada}</td>
    <td>${client.email}</td>
    <td class="acoes">
      <button class="edit" id="editar-${index}">Editar</button>
      <button class="remove" id="remover-${index}">Remover</button>
    </td>
  `;

  table.appendChild(row);
};

const clearTable = () => {
  document.querySelector("#table tbody").innerHTML = "";
};

const updateTable = () => {
  clearTable();
  getList().forEach(createRow);
};

// Preencher formulário para editar
const fillFields = (client, index) => {
  nome.value = client.nome;
  numero.value = client.numero;
  morada.value = client.morada;
  email.value = client.email;

  nome.dataset.index = index;
  document.querySelector(".title h3").textContent = `Editar Cliente: ${client.nome}`;
};

// Evento de editar ou apagar
const editDelete = (event) => {
  if (event.target.tagName !== "BUTTON") return;

  const [action, index] = event.target.id.split("-");

  if (action === "editar") {
    const client = getList()[index];
    fillFields(client, index);
    openCadastro();
  } else {
    const client = getList()[index];
    const confirmation = confirm(`Deseja remover o cliente ${client.nome}?`);
    if (confirmation) {
      deleteClient(index);
      updateTable();
    }
  }
};

// ===============================
// Eventos
// ===============================
document.querySelector("#openCadastro").addEventListener("click", openCadastro);
document.querySelector("#save").addEventListener("click", saveClient);
document.querySelector("#cancel").addEventListener("click", closeCadastro);
document.querySelector("#table tbody").addEventListener("click", editDelete);
document.querySelector(".icon-close").addEventListener("click", closeCadastro);

// Inicializa tabela
updateTable();
