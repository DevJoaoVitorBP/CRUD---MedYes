class AppointmentUseCases {
    constructor(appointmentRepository) {
      this.appointmentRepository = appointmentRepository;
    }
  
    async createAppointment(appointment) {
      try {
        return await this.appointmentRepository.create(appointment);
      } catch (error) {
        throw new Error(`Erro ao criar consulta: ${error.message}`);
      }
    }
  
    async getAllAppointments() {
      try {
        return await this.appointmentRepository.getAll();
      } catch (error) {
        throw new Error(`Erro ao obter todas as consultas: ${error.message}`);
      }
    }
  
    async getAppointmentById(id) {
      try {
        const appointment = await this.appointmentRepository.getById(id);
        if (!appointment) {
          throw new Error(`Consulta com o ID '${id}' não encontrada`);
        }
        return appointment;
      } catch (error) {
        throw new Error(`Erro ao buscar a consulta com o ID '${id}': ${error.message}`);
      }
    }
  
    async updateAppointment(id, appointment) {
      try {
        await this.appointmentRepository.update(id, appointment);
      } catch (error) {
        throw new Error(`Erro ao atualizar consulta: ${error.message}`);
      }
    }
    
  
    async deleteAppointment(id) {
      try {
        await this.appointmentRepository.delete(id);
      } catch (error) {
        throw new Error(`Erro ao excluir consulta: ${error.message}`);
      }
    }
  
    async getMedicoId(id) {
      try {
        return await this.appointmentRepository.getMedicoId(id);
      } catch (error) {
        throw new Error(`Erro ao obter ID do médico: ${error.message}`);
      }
    }
  
    async getPacienteId(id) {
      try {
        return await this.appointmentRepository.getPacienteId(id);
      } catch (error) {
        throw new Error(`Erro ao obter ID do paciente: ${error.message}`);
      }
    }
  }
  
  module.exports = AppointmentUseCases;
  