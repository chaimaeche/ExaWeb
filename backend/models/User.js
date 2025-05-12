const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    email: { type: String, required: true, unique: true },
    password: String,
    dateNaissance: Date,
    sexe: String,
    etablissement: String,
    filiere: String,
    role: { type: String, enum: ['etudiant', 'enseignant'] }
});

module.exports = mongoose.model('User', userSchema);
