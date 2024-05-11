<template>
  <div id="layout">
    <!-- Formulário de cadastro de secretária -->
    <div class="cadastrarSecretaria">
      <label for="nameInput">Nome:</label>
      <input v-model="secretary.nome" placeholder="Nome">
      <label for="admissionDateInput">Data de Admissão:</label>
      <input v-model="secretary.dataAdmissao" placeholder="Data de Admissão" type="date">
      <button @click="createSecretary">Cadastrar Secretária</button>
      <p class="message" v-if="message">{{ message }}</p>
    </div>

    <!-- Lista de secretárias -->
    <div class="listaSecretaria">
      <ul>
        <li v-for="secretary in secretaries" :key="secretary.id">
          <input type="checkbox" v-model="secretary.selected">
          Nome: {{ secretary.nome }} - Data de admissão: {{ formattedDate(secretary.dataAdmissao) }}
        </li>
      </ul>
      <button @click="removeSelectedSecretaries">Remover secretárias selecionadas</button>
      <p class="message" v-if="removeMessage">{{ removeMessage }}</p>
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
    const secretaries = ref([]);

    const showMessage = (count) => {
      if (count === 1) {
        removeMessage.value = 'Secretária removida com sucesso!';
      } else if (count > 1) {
        removeMessage.value = 'Secretárias removidas com sucesso!';
      }
      setTimeout(() => {
        removeMessage.value = '';
      }, 5000); // Tempo de exibição da mensagem em milissegundos (5 segundos)
    };

    const formattedDate = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };

    const createSecretary = async () => {
      if (!secretary.nome || !secretary.dataAdmissao) {
        message.value = 'Por favor, insira o nome e a data de admissão.';
        return;
      }

      try {
        await axios.post('http://localhost:3000/api/secretaries', secretary);
        message.value = 'Secretária cadastrada com sucesso!';
        secretary.nome = ''; // Limpa o campo de nome
        secretary.dataAdmissao = ''; // Limpa o campo de data de admissão
        fetchSecretaries(); // Atualiza a lista de secretárias após o cadastro
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSecretaries = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/secretaries');
        secretaries.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const removeSelectedSecretaries = async () => {
      const selectedSecretaries = secretaries.value.filter(secretary => secretary.selected);
      for (const secretary of selectedSecretaries) {
        try {
          await axios.delete(`http://localhost:3000/api/secretaries/${secretary.id}`);
        } catch (error) {
          console.error(error);
        }
      }
      fetchSecretaries(); // Atualiza a lista de secretárias após a remoção
      showMessage(selectedSecretaries.length); // Exibe mensagem de remoção
    };

    onMounted(fetchSecretaries);

    return {
      secretaries,
      secretary,
      message,
      removeMessage,
      createSecretary,
      removeSelectedSecretaries,
      formattedDate
    };
  }
};
</script>

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
