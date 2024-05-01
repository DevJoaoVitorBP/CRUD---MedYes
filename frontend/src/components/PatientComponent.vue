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

.registerPatient,
.lstPatient {
  width: 400px; /* Largura do componente */
}

.registerPatient {
  margin-right: 30px; /* Adiciona espaço entre os componentes */
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
  background-color: #007bff; /* Azul */
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
  background-color: #0056b3; /* Azul mais escuro */
}

.lstPatient ul {
  list-style-type: none;
  padding: 0;
}

.lstPatient li {
  background-color: #f9f9f9; /* Cinza claro */
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



  

<template>
  <div id = 'layout'>
    <div class = 'registerPatient'>
        <input v-model="patient.nome" placeholder="Nome">
      <input v-model="patient.numeroCarteira" placeholder="numeroCarteira">
      <button @click="createPatient">Cadastrar Paciente</button>
      <p>{{ message }}</p>
    </div>

    <div class = 'lstPatient'>
      <ul>
        <li v-for="patient in Patients" :key="patient.id">
          <input type="checkbox" v-model="patient.selected">
         Nome: {{ patient.nome }}  Numero carteira: {{ patient.numeroCarteira }}
        </li>
      </ul>
      <button @click="removeSelectedPatients">Remover paciente selecionado(os)</button>
      <p>{{ removeMessage }}</p>
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
    const Patients = ref([]);

    const showMessage = (count) => {
      if (count === 1) {
        removeMessage.value = 'Paciente foi removido com sucesso!';
      } else if (count > 1) {
        removeMessage.value = 'Pacientes foram removidos com sucesso!';
      }
    };

    const createPatient = async () => {
      if (!patient.nome || !patient.numeroCarteira) {
        message.value = 'Por favor, insira o nome e o dataAdmissao.';
        return;
      }

      if (!/^\d+$/.test(patient.numeroCarteira)) {
        message.value = 'O numeroCarteira deve conter apenas números.';
        return;
      }

      

      try {
        await axios.post('http://localhost:3000/api/patients', patient);
        message.value = 'Médico cadastrado com sucesso!';
        patient.nome = ''; // Reseta o campo de nome
        patient.numeroCarteira = ''; // Reseta o campo dataAdmissao
        fetchPatients(); // Atualiza a lista de médicos após adicionar um novo médico
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/patients');
        Patients.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const removeSelectedPatients = async () => {
      const selectedPatients = Patients.value.filter(patient => patient.selected);
      for (const patient of selectedPatients) {
        try {
          await axios.delete(`http://localhost:3000/api/Patients/${patient.id}`);
        } catch (error) {
          console.error(error);
        }
      }
      fetchPatients(); // Atualiza a lista de médicos após remover médicos selecionados
      showMessage(selectedPatients.length); // Exibe mensagem de remoção
    };

    onMounted(fetchPatients);

    return {
      Patients,
      patient,
      message,
      removeMessage,
      createPatient,
      removeSelectedPatients
    };
  }
};
</script>
