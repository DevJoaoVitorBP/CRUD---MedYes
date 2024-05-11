<template>
  <div id="layout">
    <div class="registerPatient">
      <label for="nameInput">Nome:</label>
      <input v-model="patient.nome" placeholder="Nome completo">
      <label for="walletNumberInput">Número da Carteira:</label>
      <input v-model="patient.numeroCarteira" placeholder="12321">
      <button @click="createPatient">Cadastrar Paciente</button>
      <p v-if="message" class="message">{{ message }}</p>
    </div>

    <div class="lstPatient">
      <ul>
        <li v-for="patient in patients" :key="patient.id">
          <input type="checkbox" v-model="patient.selected">
          Nome: {{ patient.nome }} | Número da Carteira: {{ patient.numeroCarteira }}
        </li>
      </ul>
      <button @click="removeSelectedPatients">Remover paciente(s) selecionado(s)</button>
      <p v-if="removeMessage" class="message">{{ removeMessage }}</p>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const patient = reactive({
      nome: '',
      numeroCarteira: ''
    });

    const message = ref('');
    const removeMessage = ref('');
    const patients = ref([]);

    const showMessage = (msgRef, count) => {
      msgRef.value = `Paciente${count > 1 ? 's' : ''} removido${count > 1 ? 's' : ''} com sucesso!`;
      setTimeout(() => {
        msgRef.value = '';
      }, 5000);
    };

    const createPatient = async () => {
      if (!patient.nome || !patient.numeroCarteira) {
        message.value = 'Por favor, insira o nome e o número da carteira.';
        showMessage(message, 0);
        return;
      }

      if (!/^\d+$/.test(patient.numeroCarteira)) {
        message.value = 'O número da carteira deve conter apenas números.';
        showMessage(message, 0);
        return;
      }

      try {
        await axios.post('http://localhost:3000/api/patients', patient);
        message.value = 'Paciente cadastrado com sucesso!';
        patient.nome = '';
        patient.numeroCarteira = '';
        fetchPatients();
        showMessage(message, 0);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/patients');
        patients.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const removeSelectedPatients = async () => {
      const selectedPatients = patients.value.filter(patient => patient.selected);
      for (const patient of selectedPatients) {
        try {
          await axios.delete(`http://localhost:3000/api/patients/${patient.id}`);
        } catch (error) {
          console.error(error);
        }
      }
      fetchPatients();
      showMessage(removeMessage, selectedPatients.length);
    };

    onMounted(fetchPatients);

    return {
      patients,
      patient,
      message,
      removeMessage,
      createPatient,
      removeSelectedPatients
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

.registerPatient,
.lstPatient {
  width: 400px;
}

.registerPatient {
  margin-right: 30px;
}

.registerPatient input {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
}

.registerPatient button,
.lstPatient button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.patient-item {
  margin-bottom: 10px;
}

.registerPatient button:hover,
.lstPatient button:hover {
  background-color: #0056b3;
}

.lstPatient ul {
  list-style-type: none;
  padding: 0;
}

.lstPatient li {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
}

.lstPatient li input[type="checkbox"] {
  margin-right: 10px;
}

.message {
  color: green;
  font-size: 20px;
}
</style>
