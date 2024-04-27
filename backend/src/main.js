const mysql = require('mysql');
const DoctorRepository = require('./adapters/DoctorRepository');
const DoctorUseCases = require('./use_cases/DoctorUseCases'); // Import DoctorUseCases
const Server = require('./frameworks/Server');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'dbMedYes'
});

connection.connect();

const doctorRepository = new DoctorRepository(connection);
const doctorUseCases = new DoctorUseCases(doctorRepository);
const server = new Server(doctorUseCases);

console.log('Server started on port 3000: http://localhost:3000');
server.start();

module.exports = connection;