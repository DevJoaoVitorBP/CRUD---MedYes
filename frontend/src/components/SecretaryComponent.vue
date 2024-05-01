<style scoped>
#layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Altura total da viewport */
}

.container {
  display: flex;
}

.cadastrarSecretaria,
.listaSecretaria {
  width: 400px; /* Largura do componente */
}

.cadastrarSecretaria {
  margin-right: 30px; /* Adiciona espaço entre os componentes */
}

.cadastrarSecretaria input {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
}

.cadastrarSecretaria button,
.listaSecretaria button {
  width: 100%;
  padding: 10px;
  background-color: #007bff; /* Azul */
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.cadastrarSecretaria button:hover,
.listaSecretaria button:hover {
  background-color: #0056b3; /* Azul mais escuro */
}

.listaSecretaria ul {
  list-style-type: none;
  padding: 0;
}

.listaSecretaria li {
  background-color: #f9f9f9; /* Cinza claro */
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
}

.listaSecretaria li input[type="checkbox"] {
  margin-right: 10px;
}

.message {
  color: green;
  font-size: 20px;
}
</style>



  

<template>
  <div id = 'layout'>
    <div class = 'cadastrarSecretaria'>
      <input v-model="secretary.nome" placeholder="Nome">
      <input v-model="secretary.dataAdmissao" placeholder="dataAdmissao">
      <button @click="createSecretary">Cadastrar médico</button>
      <p>{{ message }}</p>
    </div>

    <div class = 'listaSecretaria'>
      <ul>
        <li v-for="secretary in Secretaries" :key="secretary.id">
          <input type="checkbox" v-model="secretary.selected">
          {{ secretary.nome }} - {{ secretary.dataAdmissao }}
        </li>
      </ul>
      <button @click="removeSelectedSecretaries">Remover médicos selecionados</button>
      <p>{{ removeMessage }}</p>
    </div>
  </div>
</template>

<script>

import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const secretary = reactive({
      nome: '',
      dataAdmissao: ''
    });
    const message = ref('');
    const removeMessage = ref('');
    const Secretaries = ref([]);

    const showMessage = (count) => {
      if (count === 1) {
        removeMessage.value = 'Médico foi removido com sucesso!';
      } else if (count > 1) {
        removeMessage.value = 'Médicos foram removidos com sucesso!';
      }
    };

    const createSecretary = async () => {
      if (!secretary.nome || !secretary.dataAdmissao) {
        message.value = 'Por favor, insira o nome e o dataAdmissao.';
        return;
      }

      

      try {
        await axios.post('http://localhost:3000/api/Secretaries', secretary);
        message.value = 'Médico cadastrado com sucesso!';
        secretary.nome = ''; // Reseta o campo de nome
        secretary.dataAdmissao = ''; // Reseta o campo dataAdmissao
        fetchSecretaries(); // Atualiza a lista de médicos após adicionar um novo médico
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSecretaries = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/Secretaries');
        Secretaries.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const removeSelectedSecretaries = async () => {
      const selectedSecretaries = Secretaries.value.filter(secretary => secretary.selected);
      for (const secretary of selectedSecretaries) {
        try {
          await axios.delete(`http://localhost:3000/api/secretaries/${secretary.id}`);
        } catch (error) {
          console.error(error);
        }
      }
      fetchSecretaries(); // Atualiza a lista de médicos após remover médicos selecionados
      showMessage(selectedSecretaries.length); // Exibe mensagem de remoção
    };

    onMounted(fetchSecretaries);

    return {
      Secretaries,
      secretary,
      message,
      removeMessage,
      createSecretary,
      removeSelectedSecretaries
    };
  }
};
</script>
