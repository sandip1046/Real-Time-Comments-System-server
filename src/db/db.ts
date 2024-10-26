require("dotenv").config();
import mysql, { Pool, PoolConnection } from 'mysql2/promise';


class Database {
    private static instance: Database;
    private pool: Pool;

    private constructor() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            database: 'detrator',
            password:process.env.password,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }

    // Get the singleton instance
    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    // Get a connection from the pool
    public async getConnection(): Promise<PoolConnection> {
        try {
            return await this.pool.getConnection();
        } catch (error) {
            console.error('Error getting connection from the pool:', error);
            throw error;
        }
    }

    // Close all connections
    public async closePool(): Promise<void> {
        await this.pool.end();
    }
}


export default Database.getInstance();// Export the singleton instance
