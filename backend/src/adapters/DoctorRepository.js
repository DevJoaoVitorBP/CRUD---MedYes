const Doctor = require('../domain/Doctor');
const mysql = require('mysql');


class DoctorRepository {
  constructor(database) {
    this.database = database;
  }

  create(medico) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO medico (nome, registro) VALUES (?, ?)';
      const values = [medico.nome, medico.registro];

      this.database.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(new Doctor(results.id, medico.nome, medico.registro));
        }
      });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM medico';
  
      this.database.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM medico WHERE id = ?';
      const values = [id];

      this.database.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else if (results.length === 0) {
          resolve(null);
        } else {
          const row = results[0];
          resolve(new Doctor(row.id, row.nome, row.registro));
        }
      });
    });
  }

  update(id, medico) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE medico SET nome = ?, registro = ? WHERE id = ?';
      const values = [medico.nome, medico.registro, id];

      this.database.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(new Doctor(id, medico.nome, medico.registro));
        }
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM medico WHERE id = ?';
      const values = [id];

      this.database.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}


module.exports = DoctorRepository;