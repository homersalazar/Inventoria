const db = require('../config/db');
const path = require('path');
const fs = require('fs');

exports.productFetch = async (req, res) => {
    const sql = `
        SELECT products.*, categories.ctgy_name 
        FROM products
        LEFT JOIN categories
        ON products.ctgy_id = categories.id
        GROUP BY ctgy_id, item_code;    
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ message: 'Server error', error: err.message });
        }

        res.json(results);        
    });
}

exports.productStore = async (req, res) => {
    try {
        const { product_name, item_code, stock_size, ctgy_id, price, description } = req.body;
        const image = req.files.product_path;

        // Ensure upload directory exists
        const uploadDir = path.join(__dirname, '../../frontend/public/uploads/product');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Generate unique filename
        const ext = path.extname(image.name);
        const filename = `${product_name.replace(/\s+/g, '_')}_${Date.now()}${ext}`;
        const imagePath = path.join(uploadDir, filename);

        // Move the file to the upload directory
        await image.mv(imagePath);

        // Save to the database
        const sql = 'INSERT INTO products (prod_name, item_code, description, size, ctgy_id, price, product_path) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [product_name, item_code, description, stock_size, ctgy_id, price, filename], (err, result) => {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }

            res.json({
                id: result.insertId,
                product_name,
                item_code,
                stock_size,
                description,
                ctgy_id,
                price,
                product_path: filename,
                message: 'Product created successfully',
            });
        });
    } catch (error) {
        console.error('Error storing category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.productView = async (req, res) => {
    const { item_code } = req.params; 
    
    const sql = `SELECT 
                        products.*, 
                        categories.ctgy_name,
                        GROUP_CONCAT(avail_sizes.size ORDER BY FIELD(avail_sizes.size, 'XS', 'S', 'M', 'L', 'XL', 'XXL') SEPARATOR ', ') AS available_size
                    FROM products
                    LEFT JOIN categories ON products.ctgy_id = categories.id
                    LEFT JOIN (SELECT item_code, size FROM products) avail_sizes 
                        ON avail_sizes.item_code = products.item_code
                    WHERE products.item_code = ?
                    GROUP BY products.id, categories.ctgy_name
                    ORDER BY FIELD(avail_sizes.size, 'XS', 'S', 'M', 'L', 'XL', 'XXL')`;

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(sql, [item_code], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        if (results.length === 0) {
            return res.status(404).json({ message: 'No product found.' });
        }

        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.productRelatedView = async (req, res) => {
    const ctgy_id = req.params.ctgy_id;
    const item_code = req.params.item_code;

    const sql = `SELECT 
                    products.*, categories.ctgy_name
                FROM products
                LEFT JOIN categories ON products.ctgy_id = categories.id
                WHERE products.ctgy_id = ? 
                AND item_code != ?
                GROUP BY products.item_code`;

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(sql, [ctgy_id, item_code], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        if (results.length === 0) {
            return res.status(404).json({ message: 'No product found.' });
        }

        res.json(results);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.productEdit = async (req, res) => {
    const { item_code } = req.params; 
    
    const sql = `SELECT 
                        products.*, 
                        categories.ctgy_name,
                        (SUM(CASE WHEN quantities.trans_status = 0 THEN quantities.quantity ELSE 0 END) -
                        SUM(CASE WHEN quantities.trans_status = 1 THEN quantities.quantity ELSE 0 END)) AS quantity
                    FROM products
                    LEFT JOIN categories ON products.ctgy_id = categories.id
                    LEFT JOIN quantities ON products.id = quantities.prod_id
                    WHERE products.item_code = ?
                    GROUP BY products.id`;

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(sql, [item_code], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        if (results.length === 0) {
            return res.status(404).json({ message: 'No product found.' });
        }

        res.json(results);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.productShow = async (req, res) => {
    const { id } = req.params; 
    
    const sql = `SELECT *
                FROM products
                WHERE products.id = ?`;

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(sql, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        if (results.length === 0) {
            return res.status(404).json({ message: 'No product found.' });
        }

        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.productUpdate = async (req, res) => {
    try {
        const id = req.params.id; // Get ID from URL
        const { prod_name, item_code, description, size, price } = req.body;
        let newFilename = null;

        // Check if product exists
        const getProductSql = 'SELECT product_path FROM products WHERE id = ?';
        db.query(getProductSql, [id], async (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }

            const oldFilename = results[0].product_path;
            const uploadDir = path.join(__dirname, '../../frontend/public/uploads/product');

            // Handle file upload
            if (req.files && req.files.product_path) {
                const image = req.files.product_path;
                const ext = path.extname(image.name);
                newFilename = `${prod_name.replace(/\s+/g, '_')}_${Date.now()}${ext}`;
                const imagePath = path.join(uploadDir, newFilename);
                await image.mv(imagePath);

                // Delete old image if exists
                if (oldFilename) {
                    const oldImagePath = path.join(uploadDir, oldFilename);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
            } else {
                newFilename = oldFilename;
            }

            // Update product
            const updateSql = 'UPDATE products SET prod_name = ?, item_code = ?, description = ?, size = ?, price = ?, product_path = ? WHERE id = ?';
            db.query(updateSql, [prod_name, item_code, description, size, price, newFilename, id], (updateErr) => {
                if (updateErr) {
                    return res.status(500).json({ error: 'Database error' });
                }
                res.json({ message: 'Product updated successfully', product_path: newFilename });
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
