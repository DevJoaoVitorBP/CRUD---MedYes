class AppointmentUseCases {
  constructor(appointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  async createAppointment(appointment) {
    return this.appointmentRepository.create(appointment);
  }

  async getAllAppointments() {
    return this.appointmentRepository.getAll();
  }

    async getAppointment(id) {
        return this.appointmentRepository.getById(id);
    }

    async updateAppointment(id, appointment) {
        return this.appointmentRepository.update(id, appointment);
    }

    async deleteAppointment(id) {
        return this.appointmentRepository.delete(id);
    }
}

module.exports = AppointmentUseCases;