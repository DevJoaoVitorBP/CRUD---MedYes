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

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'dbMedYes'
});

// Inicialização da conexão
connection.connect();

// Inicialização dos repositórios e casos de uso
const patientRepository = new PatientRepository(connection);
const patientUseCases = new PatientUseCases(patientRepository);
const secretaryRepository = new SecretaryRepository(connection);
const secretaryUseCases = new SecretaryUseCases(secretaryRepository);
const doctorRepository = new DoctorRepository(connection);
const doctorUseCases = new DoctorUseCases(doctorRepository);
const appointmentRepository = new AppointmentRepository(connection);
const appointmentUseCases = new AppointmentUseCases(appointmentRepository);

// Inicialização do servidor
const server = new Server(doctorUseCases, patientUseCases, secretaryUseCases, appointmentUseCases);

// Inicia o servidor na porta 3000
server.start();

// Mensagem de console indicando que o servidor está rodando
console.log('Servidor iniciado na porta 3000: http://localhost:3000');

// Exporta a conexão para ser utilizada em outros módulos, se necessário
module.exports = connection;
