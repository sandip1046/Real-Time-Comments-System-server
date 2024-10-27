# Real-Time Comments System

This project is a real-time comments application built with Next.js for the frontend and Node.js with TypeScript for the backend. It uses MySQL for data storage, Material UI (MUI) for styling, and Socket.IO for real-time comment updates.

## Features

- User Authentication
- Real-time Comment Posting and Updates using Socket.IO
- Comments stored in MySQL
- Frontend styled with Material UI (MUI)

## Tech Stack

- **Frontend**: Next.js, Material UI (MUI), Axios
- **Backend**: Node.js, Express, TypeScript, Socket.IO
- **Database**: MySQL

## Getting Started

To get a local copy up and running, follow these steps:

### Clone the repository:

```bash
git clone https://github.com/your-username/real-time-comments.git
cd real-time-comments
```



## Installation

  ### Backend Setup
  
  1. Open a new terminal and navigate to the backend directory:
  
         
             cd backend
         
  2. Install the required dependencies:
  
            npm install
          
  3. Configure environment variables:
     
      Create a .env file in the backend folder with the following contents
     
    
          DB_HOST=localhost
          DB_USER=root
          DB_PASSWORD=yourpassword
          DB_NAME=comments_database
          JWT_SECRET=your_jwt_secret
    
  3. Start the backend server:
     
    
          # Using nodemon
          npx nodemon src/index.ts
          
          # Or directly with Node.js
          node src/index.ts
    
  The backend will run on http://localhost:8000 by default.


  ### Database Setup
  
  1. Install MySQL: Ensure you have MySQL installed and running on your machine.
     
  2. Create a MySQL Database:
       - Log in to MySQL
       - Create the database and tables:
         
           
                  CREATE DATABASE IF NOT EXISTS comments_database;
                  USE comments_database;
                  CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL
                  );
                  CREATE TABLE IF NOT EXISTS comments (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id INT NOT NULL,
                    comment TEXT NOT NULL,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                  );
              
  3. Update your .env file in the backend directory with the correct database credentials.
  4. Test the Connection: Start the backend server to verify that MySQL is connected without any errors.
  
  By default, the frontend will run on http://localhost:3000.
  


##Assumptions

- This setup assumes you have MySQL installed and accessible on your local machine.
- The .env file must be configured with valid MySQL credentials and a JWT secret.
- if the database connection is not wroking  then
     1. Create a database and table locally using the query present in the file  path: *Backend\src\db\db.schema.sql*
     2. Replace the code of *Backend\src\db\db.ts* with this code:
       
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
                              queueLimit: 0,0,
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

 # API Testing Images

1. **GET Comment**
   ![GET Comment](https://github.com/your-username/your-repo/blob/main/Real-Time-Comments-System-server/API%20TESTING%20IMAGE/GET-COMMENT.png)

2. **Login**
   ![Login](https://github.com/your-username/your-repo/blob/main/Real-Time-Comments-System-server/API%20TESTING%20IMAGE/LOGIN.png)

3. **Post Comment**
   ![Post Comment](https://github.com/your-username/your-repo/blob/main/Real-Time-Comments-System-server/API%20TESTING%20IMAGE/POST-COMMENT.png)

4. **Registration**
   ![Registration](https://github.com/your-username/your-repo/blob/main/Real-Time-Comments-System-server/API%20TESTING%20IMAGE/REGISTRATION.png)


