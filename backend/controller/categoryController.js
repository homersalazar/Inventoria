const db = require('../config/db');
const path = require('path');
const fs = require('fs');

exports.categoryStore = async (req, res) => {
    try {
        if (!req.body.ctgy_name) {
            return res.status(400).json({ error: "Category name is required" });
        }
        if (!req.files || !req.files.image) {
            return res.status(400).json({ error: "Image is required" });
        }

        const { ctgy_name } = req.body;
        const image = req.files.image;

        // Ensure upload directory exists
        const uploadDir = path.join(__dirname, '../../frontend/public/uploads/category');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Generate unique filename
        const ext = path.extname(image.name);
        const filename = `${ctgy_name.replace(/\s+/g, '_')}_${Date.now()}${ext}`;
        const imagePath = path.join(uploadDir, filename);

        // Move the file to the upload directory
        await image.mv(imagePath);

        // Save to the database
        const sql = 'INSERT INTO categories (image_path, ctgy_name) VALUES (?, ?)';
        db.query(sql, [filename, ctgy_name], (err, result) => {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }

            res.json({
                id: result.insertId,
                ctgy_name,
                image_path: filename,
                message: 'Category created successfully',
            });
        });
    } catch (error) {
        console.error('Error storing category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.categoryFetch = async (req, res) => {
    const sql = `
        SELECT id, image_path, ctgy_name FROM categories;    
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: 'Server error', error: err.message });
        }

        res.json(results);        
    });
}