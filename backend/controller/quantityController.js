const db = require('../config/db');

exports.quantityStore = async (req, res) => {
    try {
        const { prod_id, quantity, trans_status } = req.body;

        // Save to the database
        const sql = 'INSERT INTO quantities (prod_id, quantity, trans_status) VALUES (?, ?, ?)';
        db.query(sql, [prod_id, quantity, trans_status], (err, result) => {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }

            res.json({
                id: result.insertId,
                prod_id,
                quantity,
                trans_status,
                message: 'Quantity added successfully',
            });
        });
    } catch (error) {
        console.error('Error storing category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};