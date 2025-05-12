const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { email, password, ...rest } = req.body;

    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email déjà utilisé' });

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashed, ...rest });

        await user.save();

        res.status(201).json({ message: 'Inscription réussie', role: user.role });
    } catch (err) {
        console.error("Erreur inscription :", err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

