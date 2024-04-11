import { Router } from "express";
import { createTask, getTask, removeTask, updateTask } from "../controllers/tasks";

const router = Router();

router.post('/task',createTask);
router.get('/task/:id',getTask);
router.put('/task/:id',updateTask);
router.delete('/task/:id',removeTask);