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

  async getAppointment(id) {
      return this.appointmentRepository.getById(id);
  }

  async updateAppointment(id, medicoId, pacienteId, dataEntrada, dataSaida, notas) {
      return this.appointmentRepository.update(id, medicoId, pacienteId, dataEntrada, dataSaida, notas);
  }

  async deleteAppointment(id) {
      return this.appointmentRepository.delete(id);
  }
}

module.exports = AppointmentUseCases;
