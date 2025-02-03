const bcrypt = require('bcrypt');
const db = require('../config/db');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'd3c6bcd4c0c6947d1ef113b41d37bdd350679b42416266b6db1666b6eb0f0454'; 

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

            const userId = result.insertId; 
            
            const additionalSql = 'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)';
            const role_id = '1'; // 1 - customer as default
            db.query(additionalSql, [userId, role_id], (err, additionalResult) => {
                if (err) {
                    console.error('Error inserting additional role data:', err.message);
                    return res.status(500).json({ error: 'Server error' }); // Return JSON
                }

                res.json({
                    id: result.insertId,
                    first_name,
                    last_name,
                    email,
                    message: 'Account created successfully',
                });
            });
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Login User
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const sql = `SELECT users.*, roles.name AS role_name
                    FROM users
                    LEFT JOIN user_roles ON user_roles.user_id = users.id
                    LEFT JOIN roles ON roles.id = user_roles.role_id
                    WHERE email = ?`; 

        db.query(sql, [email], (err, results) => {
            if (err) {
                console.error('Error fetching user:', err);
                return res.status(500).json({ success: false, message: 'Server error', error: err.message });
            }
    
            if (results.length === 0) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
    
            const user = results[0];
    
            // Verify the password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
                }
    
                if (!isMatch) {
                    return res.status(401).json({ success: false, message: 'Invalid email or password' });
                }
    
                const token = jwt.sign(
                    { id: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname, role_name: user.role_name  },
                    jwtSecret,
                    { expiresIn: '1d' }
                );
    
                return res.json({
                    success: true,
                    message: 'Login successful',
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        role_name: user.role_name 
                    }
                });
            });
        });

    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

// Logout user
exports.userLogout = (req, res) => {
    // Invalidate the token (on the client side, this would mean removing the token from storage)
    res.json({ success: true, message: 'Logout successful' });
};