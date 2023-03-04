import mysql from 'mysql2';

const pool = mysql.createPool({
	host: process.env.host || 'localhost',
	user: process.env.user || 'root',
	database: process.env.database || 'meutfacd-test',
	password: process.env.password || 'password',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

export default pool.promise();
