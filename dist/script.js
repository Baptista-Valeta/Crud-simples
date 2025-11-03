window.document.querySelector("#openCadastro").addEventListener("click", function() {
   document.querySelector('.section1').classList.toggle('active'); // Alterna entre adicionar e remover a classe active do alemento   
});


function cadastrar() {
   const nome = document.querySelector('#nome');
   const numero = document.querySelector('#numero');
   const morada = document.querySelector('#morada');

   if (nome.value === '' || numero.value === '' || morada.value === '') {
      const caixaError = document.querySelector('.error').style.display = 'block';
      
      // Adicionar a mensagem de erro ...

   }else {
      const table = document.getElementsByTagName("tbody")[0];
      const table_list = document.createElement("tr");
   
      console.log(nome.value, numero.value, morada.value)
   
      table_list.innerHTML = `
         <td>${nome.value}</td>
         <td>${numero.value}</td>
         <td>${morada.value}</td>
         <></>
      `;
   
      table.appendChild(table_list);

   }
}