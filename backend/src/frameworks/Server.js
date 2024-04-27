// frameworks/Server.js
const express = require('express');

class Server {
  constructor(doctorUseCases) {
    this.doctorUseCases = doctorUseCases;
    this.app = express();

    this.app.use(express.json());

    this.app.post('/api/doctors', async (req, res) => {
      const doctor = await this.doctorUseCases.createDoctor(req.body);
      res.send(doctor);
    });

    this.app.get('/api/doctors', async (req, res) => {
      const doctors = await this.doctorUseCases.getDoctors();
      res.send(doctors);
    });

    this.app.get('/api/doctors/:id', async (req, res) => {
      const doctor = await this.doctorUseCases.getDoctor(req.params.id);
      res.send(doctor);
    });

    this.app.put('/api/doctors/:id', async (req, res) => {
      const doctor = await this.doctorUseCases.updateDoctor(req.params.id, req.body);
      res.send(doctor);
    });

    this.app.delete('/api/doctors/:id', async (req, res) => {
      await this.doctorUseCases.deleteDoctor(req.params.id);
      res.send({ message: 'Doctor deleted' });
    });
  }

  start() {
    this.app.listen(3000, () => console.log('Server started'));
  }
}
module.exports = Server;