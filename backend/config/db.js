const mysql = require('mysql')

let conn;

function handleDisconnect() {
    conn = mysql.createConnection({
        host: 'localhost',
        database: 'inventoria',
        user: 'root',
        password: ''
    });

    conn.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            setTimeout(handleDisconnect, 2000); // Retry connection after 2 seconds
        } else {
            console.log('Connected to the database.');
        }
    });

    conn.on('error', (err) => {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(); // Reconnect if the connection was lost
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = conn;
