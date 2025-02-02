const bcrypt = require('bcrypt');
const db = require('../config/db');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'securesecretkey'; // Use env variables

// Register User
exports.userRegister = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const sql = 'INSERT INTO users (FirstName, LastName, email, password) VALUES (?, ?, ?, ?)';

        db.query(sql, [first_name, last_name, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Server error' });
            }

            res.json({
                id: result.insertId,
                first_name,
                last_name,
                email,
                message: 'Account created successfully',
            });
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Validate email
exports.validateEmail = (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const sql = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Error validating email:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const isUnique = results[0].count === 0;
        res.json({ isUnique });
    });
};
