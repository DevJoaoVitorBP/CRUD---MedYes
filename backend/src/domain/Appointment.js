class Appointment {
  constructor({ id, medicoId, pacienteId, dataEntrada, dataSaida, notas}) {
    this.id = id;
    this.medicoId = medicoId;
    this.pacienteId = pacienteId;
    this.dataEntrada = dataEntrada;
    this.dataSaida = dataSaida;
    this.notas = notas;
  }
}

module.exports = Appointment;