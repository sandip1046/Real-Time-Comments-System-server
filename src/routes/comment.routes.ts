import express from "express";
import { fetchComment, postComment } from "../controller/comment.controller";

const commentRouter = express.Router();

commentRouter.get('/get-comment', fetchComment);
commentRouter.post('/post-comment', postComment);

export default commentRouter;