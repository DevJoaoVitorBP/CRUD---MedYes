class AppointmentUseCases {
  constructor(appointmentRepository) {
      this.appointmentRepository = appointmentRepository;
  }

  async createAppointment(appointment) {
      return this.appointmentRepository.create(appointment);
  }

  async getAllAppointments() {
      const appointments = await this.appointmentRepository.getAll();
      return appointments;
  }

  async getAppointmentById(id) {
    try {
        const appointment = await this.appointmentRepository.getById(id);
        if (!appointment) {
            throw new Error(`Consulta com o ID '${id}' não encontrada`);
        }
        return appointment;
    } catch (error) {
        // Handle errors from appointmentRepository.getById(id) or other unexpected errors
        throw new Error(`Erro ao buscar a consulta com o ID '${id}': ${error.message}`);
    }
}


async updateAppointment(id, updatedAppointment) {
    try {
        // Validate the updatedAppointment object
        const { medicoId, pacienteId, dataEntrada, dataSaida, notas } = updatedAppointment;
        if (!medicoId || !pacienteId || !dataEntrada || !dataSaida || !notas) {
            throw new Error('Missing required fields');
        }

        // Call the update method from the repository
        const appointment = await this.appointmentRepository.update(id, medicoId, pacienteId, dataEntrada, dataSaida, notas);

        return appointment;
    } catch (error) {
        throw new Error(`Error updating appointment: ${error.message}`);
    }
}

  async deleteAppointment(id) {
      return this.appointmentRepository.delete(id);
  }

    async getMedicoId(id) {
        return this.appointmentRepository.getMedicoId(id);
    }

   async getPacienteId(id) {
        return this.appointmentRepository.getPacienteId(id);
    }
}

module.exports = AppointmentUseCases;
