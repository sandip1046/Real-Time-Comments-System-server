require("dotenv").config();
import mysql, { Pool, PoolConnection } from 'mysql2/promise';

class Database {
    private static instance: Database;
    private pool: Pool;

    private constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
        this.setupDatabase(); // Automatically call setup on instantiation
    }

    // Get the singleton instance
    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    // Method to set up database and tables
    private async setupDatabase(): Promise<void> {
        let conn;
        try {
            conn = await this.pool.getConnection();

           
            await conn.query(`CREATE DATABASE IF NOT EXISTS Detrator`);  // Create database if it doesn't exist
            await conn.query(`USE Detrator`);

            // Create user table if it doesn't exist
            await conn.query(`
                CREATE TABLE IF NOT EXISTS user (
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    userName VARCHAR(255) NOT NULL
                )
            `);

            // Create comments table if it doesn't exist
            await conn.query(`
                CREATE TABLE IF NOT EXISTS comments (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255),
                    comment TEXT,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);

            console.log("Database and tables set up successfully.");
        } catch (error) {
            console.error('Error setting up database and tables:', error);
            throw error;
        } finally {
            if (conn) {
                conn.release();
            }
        }
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

export default Database.getInstance();
