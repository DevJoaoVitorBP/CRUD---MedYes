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

.cadastrarMedico,
.listaMedico {
  width: 400px; /* Largura do componente */
}

.cadastrarMedico {
  margin-right: 30px; /* Adiciona espaço entre os componentes */
}

.cadastrarMedico input {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
}

.cadastrarMedico button,
.listaMedico button {
  width: 100%;
  padding: 10px;
  background-color: #007bff; /* Azul */
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.cadastrarMedico button:hover,
.listaMedico button:hover {
  background-color: #0056b3; /* Azul mais escuro */
}

.listaMedico ul {
  list-style-type: none;
  padding: 0;
}

.listaMedico li {
  background-color: #f9f9f9; /* Cinza claro */
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



  

<template>
  <div id = 'layout'>
    <div class = 'cadastrarMedico'>
      <input v-model="doctor.nome" placeholder="Nome">
      <input v-model="doctor.registro" placeholder="Registro">
      <button @click="createDoctor">Cadastrar médico</button>
      <p>{{ message }}</p>
    </div>

    <div class = 'listaMedico'>
      <ul>
        <li v-for="doctor in doctors" :key="doctor.id">
          <input type="checkbox" v-model="doctor.selected">
          {{ doctor.nome }} - {{ doctor.registro }}
        </li>
      </ul>
      <button @click="removeSelectedDoctors">Remover médicos selecionados</button>
      <p>{{ removeMessage }}</p>
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
        removeMessage.value = 'Médico foi removido com sucesso!';
      } else if (count > 1) {
        removeMessage.value = 'Médicos foram removidos com sucesso!';
      }
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
        doctor.nome = ''; // Reseta o campo de nome
        doctor.registro = ''; // Reseta o campo registro
        fetchDoctors(); // Atualiza a lista de médicos após adicionar um novo médico
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
      fetchDoctors(); // Atualiza a lista de médicos após remover médicos selecionados
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
