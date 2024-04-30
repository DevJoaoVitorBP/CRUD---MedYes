class SecretaryUseCases  {
    constructor(secretaryRepository) {
        this.secretaryRepository = secretaryRepository;
    }

    createSecretary(secretary) {
        return this.secretaryRepository.create(secretary);
    }

    getSecretaries() {
        return this.secretaryRepository.getAll();
    }

    getSecretary(id) {
        return this.secretaryRepository.getById(id);
    }

    updateSecretary(id, secretary) {
        return this.secretaryRepository.update(id, secretary);
    }

    deleteSecretary(id) {
        return this.secretaryRepository.delete(id);
        
    }

}

module.exports = SecretaryUseCases;