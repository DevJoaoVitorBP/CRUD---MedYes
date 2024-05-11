<template>
  <div id="layout">
    <div class="registerAppointment">
      <input v-model="appointment.medicoId" placeholder="Nome do Médico">
      <input v-model="appointment.pacienteId" placeholder="Nome do Paciente">
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
          <button @click="showUpdateForm = true; selectedAppointment = appointment">Atualizar</button>
        </li>
      </ul>
      <button @click="removeSelectedAppointments">Remover consultas selecionadas</button>
      <p>{{ removeMessage }}</p>
    </div>

    <div v-if="showUpdateForm">
      <input v-model="selectedAppointment.medicoId" placeholder="Nome do Médico">
      <input v-model="selectedAppointment.pacienteId" placeholder="Nome do Paciente">
      <input v-model="selectedAppointment.dataEntrada" placeholder="Data de Entrada" type="date">
      <input v-model="selectedAppointment.dataSaida" placeholder="Data de Saída" type="date">
      <textarea v-model="selectedAppointment.notas" placeholder="Notas"></textarea>
      <p>{{ message }}</p>
      <button @click="updateAppointment">Atualizar Consulta</button>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const appointment = reactive({
      medicoId: '',
      pacienteId: '',
      dataEntrada: '',
      dataSaida: '',
      notas: ''
    });
    const message = ref('');
    const removeMessage = ref('');
    const appointments = ref([]);
    const selectedAppointment = ref({
      id: '',
      medicoId: '',
      pacienteId: '',
      dataEntrada: '',
      dataSaida: '',
      notas: ''
    });
    const showUpdateForm = ref(false);

    const showMessage = (count) => {
      if (count === 1) {
        removeMessage.value = 'Consulta foi removida com sucesso!';
      } else if (count > 1) {
        removeMessage.value = 'Consultas foram removidas com sucesso!';
      }
      setTimeout(() => {
        removeMessage.value = '';
      }, 5000); // Limpar mensagem após 5 segundos
    };

    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/appointments/');
        appointments.value = response.data.map(appointment => ({
          ...appointment,
          selected: false,
        }));
        selectedAppointment.value = {}; // Limpar appointment selecionado ao buscar novos appointments
      } catch (error) {
        console.error(error);
      }
    };

    const createAppointment = async () => {
      try {
        await axios.post('http://localhost:3000/api/appointments/create', appointment);
        message.value = 'Consulta cadastrada com sucesso!';
        appointment.medicoId = '';
        appointment.pacienteId = '';
        appointment.dataEntrada = '';
        appointment.dataSaida = '';
        appointment.notas = '';
        fetchAppointments();
      } catch (error) {
        console.error('Erro ao criar consulta:', error);
      }
    };

    const updateAppointment = async () => {
  try {
    // Certifique-se de que selectedAppointment.value contém todas as informações necessárias
    if (!selectedAppointment.value.medicoId || !selectedAppointment.value.pacienteId || !selectedAppointment.value.dataEntrada || !selectedAppointment.value.dataSaida || !selectedAppointment.value.notas) {
      message.value = 'Por favor, preencha todos os campos.';
      return;
    }

    // Envie uma solicitação PUT com os dados atualizados da consulta
    await axios.put(`http://localhost:3000/api/appointments/${selectedAppointment.value.id}`, {
      medicoId: selectedAppointment.value.medicoId,
      pacienteId: selectedAppointment.value.pacienteId,
      dataEntrada: selectedAppointment.value.dataEntrada,
      dataSaida: selectedAppointment.value.dataSaida,
      notas: selectedAppointment.value.notas
    });

    message.value = 'Consulta atualizada com sucesso!';
    fetchAppointments(); // Atualize a lista de consultas após a atualização
    showUpdateForm.value = false; // Oculte o formulário de atualização
  } catch (error) {
    console.error('Erro ao atualizar consulta:', error);
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
      await fetchAppointments();
      showMessage(selected.length);
    };

    onMounted(fetchAppointments);

    return {
      appointment,
      message,
      createAppointment,
      appointments,
      removeMessage,
      removeSelectedAppointments,
      fetchAppointments,
      selectedAppointment,
      showUpdateForm,
      updateAppointment,
    };
  }
};
</script>
