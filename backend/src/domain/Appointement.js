class Appointment {
  constructor({ id, medicoID, pacienteID, dataEntrada, dataSaida, notas}) {
    this.id = id;
    this.medicoID = medicoID;
    this.pacienteID = pacienteID;
    this.dataEntrada = dataEntrada;
    this.dataSaida = dataSaida;
    this.notas = notas;
  }
}

module.exports = Appointment;