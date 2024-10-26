import { Request, Response } from "express";
import db from "../db/db";

interface IComment {
    username: string;
    comment: string;
}

const postComment = async (req: Request, res: Response) => {
    let conn;
    try {
      conn = await db.getConnection();
      
      const { username,comment } = req.body as IComment ;

      await conn.query(
        "INSERT INTO comments (username, comment) VALUES (?, ?)",
        [username, comment]
      );

      res.status(201).json({message: "Comment saved successfully"})

} catch (error) {
        console.error('Error retrieving comment:', error);
        res.status(500).send('An error occurred while posting the comment');
    }
    finally { // Ensure to release the connection pool when the operation is done to prevent memory leaks
        if (conn) {
            conn.release();
        }
    }
}

const fetchComment = async (req: Request, res: Response) => {
    let conn;
    try {

      conn = await db.getConnection();

      const [rows]: [any[], any] = await conn.execute("SELECT username, comment, timestamp FROM comments ORDER BY timestamp DESC");

      const comments = rows.map((row: any) => ({
        username: row.username,
        comment: row.comment,
        timestamp: row.timestamp
      }));

      res.status(200).json(comments);

} catch (error) {
        console.error('Error retrieving comment:', error);
        res.status(500).send('An error occurred while retrieving the comment');
    }
    finally { // Ensure to release the connection pool when the operation is done to prevent memory leaks
        if (conn) {
            conn.release();
        }
    }
} 

export { postComment, fetchComment };