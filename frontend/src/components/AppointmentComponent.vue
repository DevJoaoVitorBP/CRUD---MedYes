<template>
    <div id="layout">
      <div class="registerAppointment">
        <input v-model="appointment.medicoNome" placeholder="Nome do Médico">
        <input v-model="appointment.pacienteNome" placeholder="Nome do Paciente">
        <input v-model="appointment.dataEntrada" placeholder="Data de Entrada" type="date">
        <input v-model="appointment.dataSaida" placeholder="Data de Saída" type="date">
        <textarea v-model="appointment.notas" placeholder="Notas"></textarea>
        <button @click="createAppointment">Criar Consulta</button>
        <p>{{ message }}</p>
      </div>

      <div class="lstAppointment">
        <ul>
          <li v-for="appointment in appointments" :key="appointment.id">
  <input type="checkbox" v-model="appointment.selected">
  Médico: {{ appointment.medicoNome }} - Paciente: {{ appointment.pacienteNome }} - Entrada: {{ new Date(appointment.dataEntrada).toLocaleDateString() }} - Saída: {{ new Date(appointment.dataSaida).toLocaleDateString() }}
</li>
        </ul>
        <button @click="removeSelectedAppointments">Remover consultas selecionadas</button>
        <p>{{ removeMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { reactive, ref, onMounted } from 'vue';
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
      const removeMessage = ref('');
      const appointments = ref([]);
  
      const showMessage = (count) => {
        if (count === 1) {
          removeMessage.value = 'Consulta foi removida com sucesso!';
        } else if (count > 1) {
          removeMessage.value = 'Consultas foram removidas com sucesso!';
        }
      };
  
      const checkMedicoExists = async (medicoNome) => {
        try {
          const response = await axios.get(`http://localhost:3000/api/medicos/${medicoNome}`);
          return response.data.exists;
        } catch (error) {
          console.error(error);
          return false;
        }
      };
  
      const checkPacienteExists = async (pacienteNome) => {
        try {
          const response = await axios.get(`http://localhost:3000/api/pacientes/${pacienteNome}`);
          return response.data.exists;
        } catch (error) {
          console.error(error);
          return false;
        }
      };
  
      const fetchAppointments = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/appointments/');
    appointments.value = response.data.map(appointment => ({
      ...appointment,
      selected: false, // Adiciona a propriedade 'selected' a cada compromisso
    }));
  } catch (error) {
    console.error(error);
  }
};
  
const removeSelectedAppointments = async () => {
  const selected = appointments.value.filter(appointment => appointment.selected);
  for (const appointment of selected) {
    try {
      await axios.delete(`http://localhost:3000/api/appointments/${appointment.id}`);
    } catch (error) {
      console.error(error);
    }
  }
  await fetchAppointments(); // Atualiza a lista de compromissos após remover compromissos selecionados
  showMessage(selected.length); // Exibe mensagem de remoção
};
  
      const createAppointment = async () => {
        if (!appointment.medicoNome || !appointment.pacienteNome || !appointment.dataEntrada || !appointment.dataSaida) {
          message.value = 'Por favor, preencha todos os campos.';
          return;
        }
  
        if (!(await checkMedicoExists(appointment.medicoNome))) {
          message.value = 'Médico não encontrado';
          return;
        }
  
        if (!(await checkPacienteExists(appointment.pacienteNome))) {
          message.value = 'Paciente não encontrado';
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
  
      onMounted(fetchAppointments);
  
      return {
        appointment,
        message,
        createAppointment,
        appointments,
        removeMessage,
        removeSelectedAppointments,
        checkMedicoExists,
        checkPacienteExists,
        fetchAppointments,
      };
    }
  };
  </script>
  
  