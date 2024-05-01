const mysql = require('mysql');
const PatientRepository = require('./adapters/PatientRepository');
const PatientUseCases = require('./use_cases/PatientUseCases');
const SecretaryRepository = require('./adapters/SecretaryRepository');
const SecretaryUseCases = require('./use_cases/SecretaryUseCases');
const DoctorRepository = require('./adapters/DoctorRepository');
const DoctorUseCases = require('./use_cases/DoctorUseCases'); 
const AppointmentRepository = require('./adapters/AppointmentRepository');
const AppointmentUseCases = require('./use_cases/AppointmentUseCases');
const Server = require('./frameworks/Server');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'dbMedYes'
});


connection.connect();

const patientRepository = new PatientRepository(connection);
const patientUseCases = new PatientUseCases(patientRepository);
const secretaryRepository = new SecretaryRepository(connection);
const secretaryUseCases = new SecretaryUseCases(secretaryRepository);
const doctorRepository = new DoctorRepository(connection);
const doctorUseCases = new DoctorUseCases(doctorRepository);
const appointmentRepository = new AppointmentRepository(connection);
const appointmentUseCases = new AppointmentUseCases(appointmentRepository);
const server = new Server(doctorUseCases, patientUseCases, secretaryUseCases, appointmentUseCases);

console.log('Server started on port 3000: http://localhost:3000');
server.start();

module.exports = connection;