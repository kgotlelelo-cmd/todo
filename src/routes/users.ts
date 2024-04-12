import { Router } from "express";
import { getUserDetails, getUserTasks, updateUserDetails, createUser } from "../controllers/users";

export const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/:email', getUserDetails);
userRouter.get('/task/:email', getUserTasks);
userRouter.put('/:id', updateUserDetails);
userRouter.delete('/:id');