import { Router } from "express";
import { createTask, getTask, removeTask, updateTask } from "../controllers/tasks";

export const taskRouter = Router();

taskRouter.post('/', createTask);
taskRouter.get('/:id', getTask);
taskRouter.put('/:id', updateTask);
taskRouter.delete('/:id', removeTask);