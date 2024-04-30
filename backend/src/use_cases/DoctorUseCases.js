class DoctorUseCases {
  constructor(doctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  createDoctor(doctor) {
    return this.doctorRepository.create(doctor);
  }

  getDoctors() {
    return this.doctorRepository.getAll();
  }

  getDoctor(id) {
    return this.doctorRepository.getById(id);
  }

  updateDoctor(id, doctor) {
    return this.doctorRepository.update(id, doctor);
  }

  deleteDoctor(id) {
    return this.doctorRepository.delete(id);
  }

  
}

module.exports = DoctorUseCases;