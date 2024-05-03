class Appointment {
  constructor({ id, medicoNome, pacienteNome, dataEntrada, dataSaida, notas }) {
      this.id = id;
      this.medicoNome = medicoNome;
      this.pacienteNome = pacienteNome;
      this.dataEntrada = dataEntrada;
      this.dataSaida = dataSaida;
      this.notas = notas;
  }
}

module.exports = Appointment;