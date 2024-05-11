class SecretaryUseCases {
    constructor(secretaryRepository) {
        this.secretaryRepository = secretaryRepository;
    }

    async createSecretary(secretary) {
        try {
            return await this.secretaryRepository.create(secretary);
        } catch (error) {
            throw new Error(`Erro ao criar secretária: ${error.message}`);
        }
    }

    async getSecretaries() {
        try {
            return await this.secretaryRepository.getAll();
        } catch (error) {
            throw new Error(`Erro ao obter secretárias: ${error.message}`);
        }
    }

    async getSecretary(id) {
        try {
            return await this.secretaryRepository.getById(id);
        } catch (error) {
            throw new Error(`Erro ao obter secretária com ID ${id}: ${error.message}`);
        }
    }

    async updateSecretary(id, secretary) {
        try {
            return await this.secretaryRepository.update(id, secretary);
        } catch (error) {
            throw new Error(`Erro ao atualizar secretária com ID ${id}: ${error.message}`);
        }
    }

    async deleteSecretary(id) {
        try {
            await this.secretaryRepository.delete(id);
        } catch (error) {
            throw new Error(`Erro ao deletar secretária com ID ${id}: ${error.message}`);
        }
    }
}

module.exports = SecretaryUseCases;
