const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


class Server {
  constructor(doctorUseCases, patientUseCases, secretaryUseCases, AppointmentUseCases) {
    this.patientUseCases = patientUseCases;
    this.AppointmentUseCases = AppointmentUseCases;
    this.doctorUseCases = doctorUseCases;
    this.secretaryUseCases = secretaryUseCases;
    this.app = express();
    this.app.use(cors());

    // Middleware para analisar o corpo das requisições como JSON
    this.app.use(express.json());
    this.app.use(bodyParser.json());


    // Rotas para operações relacionadas a médicos
    this.app.post('/api/doctors', this.handleAsync(this.createDoctor.bind(this)));
    this.app.get('/api/doctors', this.handleAsync(this.getDoctors.bind(this)));
    this.app.get('/api/doctors/:id', this.handleAsync(this.getDoctor.bind(this)));
    this.app.put('/api/doctors/:id', this.handleAsync(this.updateDoctor.bind(this)));
    this.app.delete('/api/doctors/:id', this.handleAsync(this.deleteDoctor.bind(this)));
    

    // Rotas para operações relacionadas a pacientes
    this.app.post('/api/patients', this.handleAsync(this.createPatient.bind(this)));
    this.app.get('/api/patients', this.handleAsync(this.getPatients.bind(this)));
    this.app.get('/api/patients/:id', this.handleAsync(this.getPatient.bind(this)));
    this.app.put('/api/patients/:id', this.handleAsync(this.updatePatient.bind(this)));
    this.app.delete('/api/patients/:id', this.handleAsync(this.deletePatient.bind(this)));

    // Rotas para operações relacionadas a secretárias
    this.app.post('/api/secretaries', this.handleAsync(this.createSecretary.bind(this)));
    this.app.get('/api/secretaries', this.handleAsync(this.getSecretaries.bind(this)));
    this.app.get('/api/secretaries/:id', this.handleAsync(this.getSecretary.bind(this)));
    this.app.put('/api/secretaries/:id', this.handleAsync(this.updateSecretary.bind(this)));
    this.app.delete('/api/secretaries/:id', this.handleAsync(this.deleteSecretary.bind(this)));

    // Rotas para operações relacionadas a consultas
    this.app.post('/api/appointments', this.handleAsync(this.createAppointment.bind(this)));
    this.app.get('/api/appointments', this.handleAsync(this.getAppointments.bind(this)));
    this.app.get('/api/appointments/:id', this.handleAsync(this.getAppointment.bind(this)));
    this.app.put('/api/appointments/:id', this.handleAsync(this.updateAppointment.bind(this)));
    this.app.delete('/api/appointments/:id', this.handleAsync(this.deleteAppointment.bind(this)));

  }

  // Método para envolver funções assíncronas e lidar com erros
  handleAsync(fn) {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
  }

  // Handlers para operações relacionadas a médicos
  async createDoctor(req, res) {
    const doctor = await this.doctorUseCases.createDoctor(req.body);
    res.send(doctor);
  }

  async getDoctors(_, res) {
    const doctors = await this.doctorUseCases.getDoctors();
    res.send(doctors);
  }

  async getDoctor(req, res) {
    const doctor = await this.doctorUseCases.getDoctor(req.params.id);
    res.send(doctor);
  }

  async updateDoctor(req, res) {
    const doctor = await this.doctorUseCases.updateDoctor(req.params.id, req.body);
    res.send(doctor);
  }

  async deleteDoctor(req, res) {
    await this.doctorUseCases.deleteDoctor(req.params.id);
    res.send({ message: 'Doctor deleted' });
  }

  // Handlers para operações relacionadas a pacientes
  async createPatient(req, res) {
    const patient = await this.patientUseCases.createPatient(req.body);
    res.send(patient);
  }

  async getPatients(req, res) {
    const patients = await this.patientUseCases.getPatients();
    res.send(patients);
  }

  async getPatient(req, res) {
    const patient = await this.patientUseCases.getPatient(parseInt(req.params.id));
    res.send(patient);
  }

  async updatePatient(req, res) {
    const patient = await this.patientUseCases.updatePatient(parseInt(req.params.id), req.body);
    res.send(patient);
  }

  async deletePatient(req, res) {
    await this.patientUseCases.deletePatient(req.params.id);
    res.send({ message: 'Patient deleted' });
  }

  // Handlers para operações relacionadas a secretárias
  async createSecretary(req, res) {
    const secretary = await this.secretaryUseCases.createSecretary(req.body);
    res.send(secretary);
  }

  async getSecretaries(req, res) {
    const secretaries = await this.secretaryUseCases.getSecretaries();
    res.send(secretaries);
  }

  async getSecretary(req, res) {
    const secretary = await this.secretaryUseCases.getSecretary(req.params.id);
    res.send(secretary);
  }

  async updateSecretary(req, res) {
    const secretary = await this.secretaryUseCases.updateSecretary(req.params.id, req.body);
    res.send(secretary);
  }

  async deleteSecretary(req, res) {
    await this.secretaryUseCases.deleteSecretary(req.params.id);
    res.send({ message: 'Secretary deleted' });
  }

  // Handlers para operações relacionadas a consultas
  async createAppointment(req, res) {
    const appointment = await this.AppointmentUseCases.createAppointment(req.body);
    res.send(appointment);
  }

  async getAppointments(req, res) {
    const appointments = await this.AppointmentUseCases.getAppointments();
    res.send(appointments);
  }

  async getAppointment(req, res) {
    const appointment = await this.AppointmentUseCases.getAppointment(req.params.id);
    res.send(appointment);
  }

  async updateAppointment(req, res) {
    const appointment = await this.AppointmentUseCases.updateAppointment(req.params.id, req.body);
    res.send(appointment);
  }

  async deleteAppointment(req, res) {
    await this.AppointmentUseCases.deleteAppointment(req.params.id);
    res.send({ message: 'Appointment deleted' });
  }


  // Inicializa o servidor na porta 3000
  start() {
    this.app.listen(3000, () => console.log('Server started'));
  }
}

module.exports = Server;
