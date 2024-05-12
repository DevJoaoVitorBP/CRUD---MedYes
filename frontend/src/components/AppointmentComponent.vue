<style>
/* Estilos gerais */
#layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

/* Estilos para o formulário de registro de consulta */
.registerAppointment {
  width: 50%;
  margin-bottom: 20px;
}

.registerAppointment input,
.registerAppointment textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
}

.registerAppointment button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

/* Estilos para a lista de consultas */
.lstAppointment {
  width: 50%;
}

.lstAppointment ul {
  list-style-type: none;
  padding: 0;
}

.lstAppointment li {
  margin-bottom: 10px;
}



</style>

<template>
  <div id="layout">
    <!-- Formulário de registro de consulta -->
    <div class="registerAppointment">
      <input v-model="newAppointment.medicoNome" placeholder="Nome do Médico">
      <input v-model="newAppointment.pacienteNome" placeholder="Nome do Paciente">
      <input v-model="newAppointment.dataEntrada" placeholder="Data de Entrada" type="date">
      <input v-model="newAppointment.dataSaida" placeholder="Data de Saída" type="date">
      <textarea v-model="newAppointment.notas" placeholder="Notas"></textarea>
      <button @click="createAppointment">Criar Consulta</button>
      <p>{{ createMessage }}</p>
    </div>

    <!-- Lista de consultas -->
    <div class="lstAppointment">
      <ul>
        <li v-for="appointment in appointments" :key="appointment.id">
          <input type="checkbox" v-model="appointment.selected">
          Médico: {{ appointment.medicoNome }} - Paciente: {{ appointment.pacienteNome }} - Entrada: {{ formattedDate(appointment.dataEntrada) }} - Saída: {{ formattedDate(appointment.dataSaida) }} - Notas: {{ appointment.notas }}
          <button @click="showUpdateForm(appointment)">Atualizar</button>
        </li>
      </ul>
      <button @click="removeSelectedAppointments">Remover consultas selecionadas</button>
      <p>{{ removeMessage }}</p>
    </div>

    <!-- Formulário de atualização -->
    <div v-if="showUpdate">
      <input v-model="selectedAppointment.medicoNome" placeholder="Nome do Médico">
      <input v-model="selectedAppointment.pacienteNome" placeholder="Nome do Paciente">
      <input v-model="selectedAppointment.dataEntrada" placeholder="Data de Entrada" type="date">
      <input v-model="selectedAppointment.dataSaida" placeholder="Data de Saída" type="date">
      <textarea v-model="selectedAppointment.notas" placeholder="Notas"></textarea>
      <p>{{ updateMessage }}</p>
      <button @click="updateAppointment">Atualizar Consulta</button>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const newAppointment = reactive({
      medicoNome: '',
      pacienteNome: '',
      dataEntrada: '',
      dataSaida: '',
      notas: ''
    });
    const createMessage = ref('');
    const removeMessage = ref('');
    const appointments = ref([]);
    const selectedAppointment = reactive({
      id: '',
      medicoNome: '',
      pacienteNome: '',
      dataEntrada: '',
      dataSaida: '',
      notas: ''
    });
    const showUpdate = ref(false);
    const updateMessage = ref('');

    const formattedDate = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };

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
        const appointment = {
          medicoNome: newAppointment.medicoNome,
          pacienteNome: newAppointment.pacienteNome,
          dataEntrada: newAppointment.dataEntrada,
          dataSaida: newAppointment.dataSaida,
          notas: newAppointment.notas
        };
        await axios.post('http://localhost:3000/api/appointments/create', appointment);
        createMessage.value = 'Consulta cadastrada com sucesso!';
        newAppointment.medicoNome = '';
        newAppointment.pacienteNome = '';
        newAppointment.dataEntrada = '';
        newAppointment.dataSaida = '';
        newAppointment.notas = '';
        await fetchAppointments();
        setTimeout(() => {
          createMessage.value = '';
        }, 5000); // Limpar mensagem após 5 segundos
      } catch (error) {
        console.error('Erro ao criar consulta:', error);
      }
    };

    const updateAppointment = async () => {
      try {
        await axios.put(`http://localhost:3000/api/appointments/${selectedAppointment.id}`, selectedAppointment);
        updateMessage.value = 'Consulta atualizada com sucesso!';
        await fetchAppointments(); // Atualize a lista de consultas após a atualização
        showUpdate.value = false; // Oculte o formulário de atualização
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

    const showUpdateForm = (appointment) => {
      selectedAppointment.id = appointment.id;
      selectedAppointment.medicoNome = appointment.medicoNome;
      selectedAppointment.pacienteNome = appointment.pacienteNome;
      selectedAppointment.dataEntrada = appointment.dataEntrada;
      selectedAppointment.dataSaida = appointment.dataSaida;
      selectedAppointment.notas = appointment.notas;
      showUpdate.value = true;
    };

    onMounted(fetchAppointments);

    return {
      newAppointment,
      createMessage,
      removeMessage,
      appointments,
      selectedAppointment,
      showUpdate,
      updateMessage,
      formattedDate,
      showMessage,
      fetchAppointments,
      createAppointment,
      removeSelectedAppointments,
      updateAppointment,
      showUpdateForm
    };
  }
};
</script>

