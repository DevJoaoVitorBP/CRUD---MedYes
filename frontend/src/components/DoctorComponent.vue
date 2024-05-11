<template>
  <div id="layout">
    <!-- Formulário de cadastro de médico -->
    <div class="cadastrarMedico">
      <label for="nameInput">Nome:</label>
      <input id="nameInput" v-model="doctor.nome" placeholder="Dr. José">
      <label for="registrationInput">Registro:</label>
      <input id="registrationInput" v-model="doctor.registro" placeholder="13123">
      <button @click="createDoctor">Cadastrar médico</button>
      <p class="message" v-if="message">{{ message }}</p>
    </div>

    <!-- Lista de médicos -->
    <div class="listaMedico">
      <ul>
        <li v-for="doctor in doctors" :key="doctor.id">
          <input type="checkbox" v-model="doctor.selected">
          Nome: {{ doctor.nome }} - Registro: {{ doctor.registro }}
        </li>
      </ul>
      <button @click="removeSelectedDoctors">Remover médicos selecionados</button>
      <p class="message" v-if="removeMessage">{{ removeMessage }}</p>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const doctor = reactive({
      nome: '',
      registro: ''
    });
    const message = ref('');
    const removeMessage = ref('');
    const doctors = ref([]);

    const showMessage = (count) => {
      if (count === 1) {
        removeMessage.value = 'Médico removido com sucesso!';
      } else if (count > 1) {
        removeMessage.value = 'Médicos removidos com sucesso!';
      }
      setTimeout(() => {
        removeMessage.value = '';
      }, 5000); // Tempo de exibição da mensagem em milissegundos (5 segundos)
    };

     const createDoctor = async () => {
        if (!doctor.nome || !doctor.registro) {
          message.value = 'Por favor, insira o nome e o registro.';
          return;
        }

        if (!/^\d+$/.test(doctor.registro)) {
          message.value = 'O registro deve conter apenas números.';
          return;
        }

        try {
          await axios.post('http://localhost:3000/api/doctors', doctor);
          message.value = 'Médico cadastrado com sucesso!';
          doctor.nome = ''; // Limpa o campo de nome
          doctor.registro = ''; // Limpa o campo de registro
          fetchDoctors(); // Atualiza a lista de médicos após o cadastro
          setTimeout(() => {
            message.value = ''; // Limpa a mensagem após 5 segundos
          }, 5000); // Tempo de exibição da mensagem em milissegundos (5 segundos)
        } catch (error) {
          console.error(error);
        }
      };


    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/doctors');
        doctors.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const removeSelectedDoctors = async () => {
      const selectedDoctors = doctors.value.filter(doctor => doctor.selected);
      for (const doctor of selectedDoctors) {
        try {
          await axios.delete(`http://localhost:3000/api/doctors/${doctor.id}`);
        } catch (error) {
          console.error(error);
        }
      }
      fetchDoctors(); // Atualiza a lista de médicos após a remoção
      showMessage(selectedDoctors.length); // Exibe mensagem de remoção
    };

    onMounted(fetchDoctors);

    return {
      doctors,
      doctor,
      message,
      removeMessage,
      createDoctor,
      removeSelectedDoctors
    };
  }
};
</script>

<style scoped>
#layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
}

.container {
  display: flex;
}

.cadastrarMedico,
.listaMedico {
  width: 400px;
}

.cadastrarMedico {
  margin-right: 30px; 
}

.cadastrarMedico input {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
}

.cadastrarMedico label {
  margin-bottom: 5px;
  display: block;
}

.cadastrarMedico button,
.listaMedico button {
  width: 100%;
  padding: 10px;
  background-color: #007bff; 
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.cadastrarMedico button:hover,
.listaMedico button:hover {
  background-color: #0056b3; 
}

.listaMedico ul {
  list-style-type: none;
  padding: 0;
}

.listaMedico li {
  background-color: #f9f9f9; 
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
}

.listaMedico li input[type="checkbox"] {
  margin-right: 10px;
}

.message {
  color: green;
  font-size: 20px;
}
</style>
