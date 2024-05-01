<template>
    <div id="layout">
      <div class="cadastrarMedico">
        <input v-model="appointment.medicoNome" placeholder="Nome do Médico">
        <input v-model="appointment.pacienteNome" placeholder="Nome do Paciente">
        <input v-model="appointment.dataEntrada" placeholder="Data de Entrada" type="date">
        <input v-model="appointment.dataSaida" placeholder="Data de Saída" type="date">
        <textarea v-model="appointment.notas" placeholder="Notas"></textarea>
        <button @click="createAppointment">Criar Consulta</button>
        <p>{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { reactive, ref } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const appointment = reactive({
        medicoNome: '',
        pacienteNome: '',
        dataEntrada: '',
        dataSaida: '',
        notas: ''
      });
      const message = ref('');
  
      const createAppointment = async () => {
        if (!appointment.medicoNome || !appointment.pacienteNome || !appointment.dataEntrada || !appointment.dataSaida) {
          message.value = 'Por favor, preencha todos os campos.';
          return;
        }
  
        try {
          await axios.post('http://localhost:3000/api/appointments', appointment);
          message.value = 'Consulta criada com sucesso!';
          appointment.medicoNome = ''; // Reseta o campo de nome do médico
          appointment.pacienteNome = ''; // Reseta o campo de nome do paciente
          appointment.dataEntrada = ''; // Reseta o campo de data de entrada
          appointment.dataSaida = ''; // Reseta o campo de data de saída
          appointment.notas = ''; // Reseta o campo de notas
        } catch (error) {
          console.error(error);
        }
      };
  
      return {
        appointment,
        message,
        createAppointment
      };
    }
  };
  </script>
  
  <style scoped>
  #cadastrarMedico {
    display: flex;
    flex-direction: column;
    width: 400px;
  }
  
  #cadastrarMedico input,
  #cadastrarMedico textarea {
    margin-bottom: 10px;
    padding: 8px;
    width: 100%;
  }
  
  #cadastrarMedico button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    border: none;
    color: white;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  #cadastrarMedico button:hover {
    background-color: #0056b3;
  }
  </style>