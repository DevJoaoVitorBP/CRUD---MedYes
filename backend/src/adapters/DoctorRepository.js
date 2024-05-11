const Doctor = require('../domain/Doctor');

class DoctorRepository {
  constructor(database) {
    this.database = database;
  }

  async create(doctor) {
    try {
      this.validateDoctor(doctor);
      const query = 'INSERT INTO medico (nome, registro) VALUES (?, ?)';
      const values = [doctor.nome, doctor.registro];
      const results = await this.executeQuery(query, values);
      const insertedId = results.insertId;
      return new Doctor(insertedId, doctor.nome, doctor.registro);
    } catch (error) {
      throw new Error(`Erro ao criar médico: ${error.message}`);
    }
  }

  async getAll() {
    try {
      const query = 'SELECT * FROM medico';
      const results = await this.executeQuery(query);
      return results.map(row => new Doctor(row.id, row.nome, row.registro));
    } catch (error) {
      throw new Error(`Erro ao obter todos os médicos: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      const query = 'SELECT * FROM medico WHERE id = ?';
      const values = [id];
      const results = await this.executeQuery(query, values);
      if (results.length === 0) {
        return null;
      }
      const row = results[0];
      return new Doctor(row.id, row.nome, row.registro);
    } catch (error) {
      throw new Error(`Erro ao obter médico por ID: ${error.message}`);
    } 
  }

  async update(id, doctor) {
    try {
      this.validateDoctor(doctor);
      const query = 'UPDATE medico SET nome = ?, registro = ? WHERE id = ?';
      const values = [doctor.nome, doctor.registro, id];
      await this.executeQuery(query, values);
      return new Doctor(id, doctor.nome, doctor.registro);
    } catch (error) {
      throw new Error(`Erro ao atualizar médico: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const query = 'DELETE FROM medico WHERE id = ?';
      const values = [id];
      await this.executeQuery(query, values);
    } catch (error) {
      throw new Error(`Erro ao excluir médico: ${error.message}`);
    }
  }

  async executeQuery(query, values = []) {
    return new Promise((resolve, reject) => {
      this.database.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  validateDoctor(doctor) {
    if (!doctor.nome || !doctor.registro) {
      throw new Error('Nome e registro são obrigatórios');
    }
  }
}

module.exports = DoctorRepository;
