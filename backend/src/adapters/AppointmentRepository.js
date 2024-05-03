const Appointment = require('../domain/Appointment');

class AppointmentRepository {
    constructor(database) {
        this.database = database;
    }

    async create(appointment) {
        try {
            if (!appointment.medicoNome || !appointment.pacienteNome || !appointment.dataEntrada) {
                throw new Error('MedicoNome, PacienteNome e Data de Entrada são obrigatórios');
            }
    
            // Obter o ID do médico e do paciente com base em seus nomes
            const medicoId = await this.getMedicoID(appointment.medicoNome);
            const pacienteId = await this.getPacienteID(appointment.pacienteNome);
    
            const query = 'INSERT INTO atendimento (medicoID, pacienteID, dataEntrada, dataSaida, notas) VALUES (?, ?, ?, ?, ?)';
            const values = [medicoId, pacienteId, appointment.dataEntrada, appointment.dataSaida, appointment.notas];
            const results = await this.executeQuery(query, values);
            const insertedId = results.insertId;
    
            return {
                id: insertedId,
                medicoNome: appointment.medicoNome,
                pacienteNome: appointment.pacienteNome,
                dataEntrada: appointment.dataEntrada,
                dataSaida: appointment.dataSaida,
                notas: appointment.notas
            };
        } catch (error) {
            throw new Error(`Erro ao criar consulta: ${error.message}`);
    }
}

    async getAll() {
        try {
            const query = `
                SELECT 
                    atendimento.id, 
                    atendimento.dataEntrada, 
                    atendimento.dataSaida, 
                    atendimento.notas, 
                    medico.nome AS medicoNome, 
                    paciente.nome AS pacienteNome
                FROM atendimento
                INNER JOIN medico ON atendimento.medicoId = medico.id
                INNER JOIN paciente ON atendimento.pacienteId = paciente.id
            `;
            const results = await this.executeQuery(query);
            return results;
        } catch (error) {
            throw new Error(`Erro ao obter consultas: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const query = `
                SELECT 
                    atendimento.id, 
                    atendimento.dataEntrada, 
                    atendimento.dataSaida, 
                    atendimento.notas, 
                    medico.id AS medicoId, 
                    paciente.id AS pacienteId
                FROM atendimento
                INNER JOIN medico ON atendimento.medicoId = medico.id
                INNER JOIN paciente ON atendimento.pacienteId = paciente.id
                WHERE atendimento.id = ?
            `;
            const values = [id];
            const results = await this.executeQuery(query, values);
            if (results.length === 0) {
                throw new Error(`Consulta com o ID '${id}' não encontrada`);
            }
            const row = results[0];
            return new Appointment({
                id: row.id, 
                medicoId: row.medicoId, 
                pacienteId: row.pacienteId, 
                dataEntrada: row.dataEntrada, 
                dataSaida: row.dataSaida, 
                notas: row.notas
            });
        } catch (error) {
            throw new Error(`Erro ao obter consulta: ${error.message}`);
        }
    }
    
    
    


    async update(id, medicoId, pacienteId, dataEntrada, dataSaida, notas) {
        try {
            const query = 'UPDATE atendimento SET medicoID = ?, pacienteID = ?, dataEntrada = ?, dataSaida = ?, notas = ? WHERE id = ?';
            const values = [medicoId, pacienteId, dataEntrada, dataSaida, notas, id];
            await this.executeQuery(query, values);
            return {
                id: id,
                medicoId: medicoId,
                pacienteId: pacienteId,
                dataEntrada: dataEntrada,
                dataSaida: dataSaida,
                notas: notas
            };
        } catch (error) {
            throw new Error(`Erro ao atualizar consulta: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const query = 'DELETE FROM atendimento WHERE id = ?';
            const values = [id];
            await this.executeQuery(query, values);
        } catch (error) {
            throw new Error(`Erro ao excluir consulta: ${error.message}`);
        }
    }

    async getMedicoID(medicoNome) {
        const query = 'SELECT id FROM medico WHERE nome = ?';
        const results = await this.executeQuery(query, [medicoNome]);
        if (results.length === 0) {
            throw new Error(`Médico com o nome '${medicoNome}' não encontrado`);
        }
        return results[0].id;
    }
    
    async getPacienteID(pacienteNome) {
        const query = 'SELECT id FROM paciente WHERE nome = ?';
        const results = await this.executeQuery(query, [pacienteNome]);
        if (results.length === 0) {
            throw new Error(`Paciente com o nome '${pacienteNome}' não encontrado`);
        }
        return results[0].id;
    }

    async getMedicoNome(medicoId) {
        console.log(medicoId)
        const query = 'SELECT nome FROM medico WHERE id = ?';
        const results = await this.executeQuery(query, [medicoId]);
        if (results.length === 0) {
            throw new Error(`Médico com o ID '${medicoId}' não encontrado`);
        }
        return results[0].nome;
    }


    async getPacienteNome(pacienteId) {
        const query = 'SELECT nome FROM paciente WHERE id = ?';
        const results = await this.executeQuery(query, [pacienteId]);
        if (results.length === 0) {
            throw new Error(`Paciente com o Id '${pacienteId}' não encontrado`);
        }
        return results[0].nome;
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

module.exports = AppointmentRepository;
