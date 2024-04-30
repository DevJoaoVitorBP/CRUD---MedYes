const Patient = require('../domain/Patient');

class PatientRepository {
  constructor(database) {
    this.database = database;
  }

  async create(patient) {
    try {
      const query = 'INSERT INTO paciente (nome, numeroCarteira) VALUES (?, ?)';
      const values = [patient.nome, patient.numeroCarteira];
      const results = await this.executeQuery(query, values);
      const insertedId = results.insertId;
      return new Patient(insertedId, patient.nome, patient.numeroCarteira);
    } catch (error) {
      throw new Error(`Erro ao criar paciente: ${error.message}`);
    }
  }

  async getAll() {
    try {
      const query = 'SELECT * FROM paciente';
      const results = await this.executeQuery(query);
      return results;
    } catch (error) {
      throw new Error(`Erro ao pegar informações de todos os clientes: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      const query = 'SELECT * FROM paciente WHERE id = ?';
      const values = [id];
      const results = await this.executeQuery(query, values);
      if (results.length === 0) {
        return null;
      }
      const row = results[0];
      return new Patient(row.id, row.nome, row.numeroCarteira);
    } catch (error) {
      throw new Error(`Erro ao pegar ID do cliente: ${error.message}`);
    }
  }

  async update(id, patient) {
    try {
      const query = 'UPDATE paciente SET nome = ?, numeroCarteira = ? WHERE id = ?';
      const values = [patient.nome, patient.numeroCarteira, id];
      await this.executeQuery(query, values);
      return new Patient(id, patient.nome, patient.numeroCarteira);
    } catch (error) {
      throw new Error(`Erro ao atualizar informações do paciente: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const query = 'DELETE FROM paciente WHERE id = ?';
      const values = [id];
      await this.executeQuery(query, values);
    } catch (error) {
      throw new Error(`Erro ao excluir paciente: ${error.message}`);
    }
  }

  executeQuery(query, values = []) {
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
}

module.exports = PatientRepository;
