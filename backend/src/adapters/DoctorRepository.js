const Doctor = require('../domain/Doctor');

class DoctorRepository {
  constructor(database) {
    this.database = database;
  }

  

  async create(medico) {
    if(!medico.nome || !medico.registro){
      throw new Error('Nome e registro são obrigatórios');
    }
    try { 
      const query = 'INSERT INTO medico (nome, registro) VALUES (?, ?)';
      const values = [medico.nome, medico.registro];
      const results = await this.executeQuery(query, values);
      const insertedId = results.insertId;
      return new Doctor(insertedId, medico.nome, medico.registro);
    }
    catch (error) {
      throw new Error(`Erro ao criar médico: ${error.message}`);
    }
  }  

  async getAll() {
    try {
      const query = 'SELECT * FROM medico';
      const results = await this.executeQuery(query);
      return results;
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

  async update(id, medico) {
    try {
      const query = 'UPDATE medico SET nome = ?, registro = ? WHERE id = ?';
      const values = [medico.nome, medico.registro, id];
      await this.executeQuery(query, values);
      return new Doctor(id, medico.nome, medico.registro);
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
}

module.exports = DoctorRepository;
