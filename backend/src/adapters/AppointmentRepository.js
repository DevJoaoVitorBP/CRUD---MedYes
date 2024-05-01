const Appointment = require('../domain/Appointment');

class Appointment
{
    constructor(database)
    {
        this.database = database;
    }

    async create(appointment)
    {
        if (!appointment.medicoNome || !appointment.pacienteNome || !appointment.dataEntrada) {
            throw new Error('MedicoNome, PacienteNome e Data de Entrada são obrigatórios');
        }
        try {
            const queryMedico = 'SELECT id FROM medico WHERE nome = ?';
            const medicoResults = await this.executeQuery(queryMedico, [appointment.medicoNome]);
            const medicoID = medicoResults[0].id;
    
            const queryPaciente = 'SELECT id FROM paciente WHERE nome = ?';
            const pacienteResults = await this.executeQuery(queryPaciente, [appointment.pacienteNome]);
            const pacienteID = pacienteResults[0].id;
    
            const query = 'INSERT INTO consulta (medicoID, pacienteID, dataEntrada, dataSaida, notas) VALUES (?, ?, ?, ?, ?)';
            const values = [medicoID, pacienteID, appointment.dataEntrada, appointment.dataSaida, appointment.notas];
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
        }
        catch (error)
        {
            throw new Error(`Erro ao criar consulta: ${error.message}`);
        }
    }

    async getAll()
    {
        try
        {
            const query = 'SELECT * FROM consulta';
            const results = await this.executeQuery(query);
            return results;
        }
        catch (error)
        {
            throw new Error(`Erro ao obter todas as consultas: ${error.message}`);
        }
    }

    async getById(id)
    {
        try
        {
            const query = 'SELECT * FROM consulta WHERE id = ?';
            const values = [id];
            const results = await this.executeQuery(query, values);
            if(results.length === 0)
            {
                return null;
            }
            const row = results[0];
            return new Appointment(row.id, row.medicoID, row.pacienteID, row.dataEntrada, row.dataSaida, row.notas);
        }
        catch (error)
        {
            throw new Error(`Erro ao obter consulta por ID: ${error.message}`);
        }
    }

    async update(id, medicoID, pacienteID, dataEntrada, dataSaida, notas) {
        try {
          const query = 'UPDATE consulta SET medicoID = ?, pacienteID = ?, dataEntrada = ?, dataSaida = ?, notas = ? WHERE id = ?';
          const values = [medicoID, pacienteID, dataEntrada, dataSaida, notas, id];
          await this.executeQuery(query, values);
          return {
            id: id,
            medicoID: medicoID,
            pacienteID: pacienteID,
            dataEntrada: dataEntrada,
            dataSaida: dataSaida,
            notas: notas
          };
        } catch (error) {
          throw new Error(`Erro ao atualizar consulta: ${error.message}`);
        }
      }

    async delete(id)
    {
        try
        {
            const query = 'DELETE FROM consulta WHERE id = ?';
            const values = [id];
            await this.executeQuery(query, values);
        }
        catch (error)
        {
            throw new Error(`Erro ao excluir consulta: ${error.message}`);
        }
    }

    async executeQuery(query, values = [])
    {
        return new Promise((resolve, reject) =>
        {
            this.database.query(query, values, (error, results) =>
            {
                if(error)
                {
                    reject(error);
                }
                else
                {
                    resolve(results);
                }
            });
        });
    }

}

module.exports = Appointment;