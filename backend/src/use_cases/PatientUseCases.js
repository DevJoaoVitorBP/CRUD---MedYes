class PatientUseCases {
    constructor(patientRepository) {
      this.patientRepository = patientRepository;
    }

    createPatient(patient) {
        return this.patientRepository.create(patient);
      }
    
      getPatients() {
        return this.patientRepository.getAll();
      }
    
      getPatient(id) {
        return this.patientRepository.getById(id);
      }
    
      updatePatient(id, patient) {
        return this.patientRepository.update(id, patient);
      }
    
      deletePatient(id) {
        return this.patientRepository.delete(id);
      }

  }
  
  module.exports = PatientUseCases;