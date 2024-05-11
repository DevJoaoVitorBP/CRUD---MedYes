const Secretary = require('../domain/Secretary');

class SecretaryRepository {
    constructor(database) {
        this.database = database;
    }
    
    async create(secretary) {
        try {
            const query = 'INSERT INTO secretaria (nome, dataAdmissao) VALUES (?, ?)';
            const values = [secretary.nome, secretary.dataAdmissao];
            const results = await this.executeQuery(query, values);
            const insertedId = results.insertId;
            return new Secretary(insertedId, secretary.nome, secretary.dataAdmissao);
        } catch (error) {
            throw new Error(`Erro ao criar secretaria: ${error.message}`);
        }
    }
    
    async getAll() {
        try {
            const query = 'SELECT * FROM secretaria';
            const results = await this.executeQuery(query);
            return results.map(row => new Secretary(row.id, row.nome, row.dataAdmissao));
        } catch (error) {
            throw new Error(`Erro ao pegar informações de todas as secretarias: ${error.message}`);
        }
    }
    
    async getById(id) {
        try {
            const query = 'SELECT * FROM secretaria WHERE id = ?';
            const values = [id];
            const results = await this.executeQuery(query, values);
            if (results.length === 0) {
                return null;
            }
            const row = results[0];
            return new Secretary(row.id, row.nome, row.dataAdmissao);
        } catch (error) {
            throw new Error(`Erro ao pegar ID da secretaria: ${error.message}`);
        }
    }
    
    async update(id, secretary) {
        try {
            const query = 'UPDATE secretaria SET nome = ?, dataAdmissao = ? WHERE id = ?';
            const values = [secretary.nome, secretary.dataAdmissao, id];
            await this.executeQuery(query, values);
            return new Secretary(id, secretary.nome, secretary.dataAdmissao);
        } catch (error) {
            throw new Error(`Erro ao atualizar informações da secretaria: ${error.message}`);
        }
    }
    
    async delete(id) {
        try {
            const query = 'DELETE FROM secretaria WHERE id = ?';
            const values = [id];
            await this.executeQuery(query, values);
        } catch (error) {
            throw new Error(`Erro ao deletar secretaria: ${error.message}`);
        }
    }
    
    async executeQuery(query, values) {
        return new Promise((resolve, reject) => {
            this.database.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }
}

module.exports = SecretaryRepository;
