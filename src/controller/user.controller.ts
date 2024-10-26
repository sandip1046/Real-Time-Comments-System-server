import { Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken'
import db from '../db/db';



interface IuserRegistration {
    userName: string;
}

const userRegistration: RequestHandler = async (req: Request, res: Response) => {

    let conn;
    let error = {
        message: ''
    };
    try {
        conn = await db.getConnection();

        const { userName } = req.body as IuserRegistration;

        const query = 'SELECT * FROM User WHERE userName = ?';

        const [rows]: [any[], any] = await conn.execute(query, [userName]);
        if (rows.length > 0) {
            res.status(400).json({ message: "user already existed" })
            return;
        }


        const queryInsert = 'INSERT INTO User (userName) VALUES (?)';

        await conn.execute(queryInsert, [userName])

        res.status(201).json({ message: "user created successfully" })

    } catch (error) {

        console.error('Error registering user:', error);

        res.status(500).json({ message: 'An error occurred while SignUp in the user' });
        return
    }
    finally { // Ensure to release the connection pool when the operation is done to prevent memory leaks
        if (conn) {
            conn.release();
        }
    }
}

const userLogin: RequestHandler = async (req: Request, res: Response) => {

    let conn;
    try {
        conn = await db.getConnection();

        const { userName } = req.body as IuserRegistration;

        const query = 'SELECT * FROM User WHERE userName = ?';

        const [rows]: [any[], any] = await conn.execute(query, [userName]);
        if (rows.length === 0) {
            res.status(404).json({ message: "user not existed" })
        }

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        
        const token = jwt.sign({ id: rows[0].id }, jwtSecret, { expiresIn: '3h' });

        res.status(200).json({ token, message: 'User logged in successfully' });

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'An error occurred while logging in the user' });
    }
    finally { // Ensure to release the connection pool when the operation is done to prevent memory leaks
        if (conn) {
            conn.release();
        }
    }
}

export { userRegistration, userLogin };