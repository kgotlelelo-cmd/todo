import { RequestHandler } from "express";

import { Task } from "../models/task";
import { User } from "../models/user";

interface UpdateTaskBody {
    description: string,
    status: string
}

interface TaskBody {
    email: string,
    description: string
}

export const createTask: RequestHandler = async (req, res) => {

    const { email, description }: TaskBody = req.body;

    try {
        const user: User | null = await User.findOne({ where: { email: email } });
        if(user){
            user.createTask({
                description: description,
                status: "IN_PROGRESS"
            });

            user.save();
            res.json({message: 'success'})
            res.status(201);
        }else{
            res.json({message: `No user with email: ${email}`});
        }
    } catch (error) {
        res.json({ message: 'Internal server Error' });
    }
}

export const getTask: RequestHandler = async (req, res) => {
    const taskId: string = req.params.id

    try {
        const task: Task | null = await Task.findByPk(parseInt(taskId));
        if (task) {
            res.json(task.toJSON());
        } else {
            res.json({ message: `No such task with id: ${taskId}` });
        }
    } catch (error) {
        res.json({ message: 'Internal server Error' })
    }
}

export const updateTask: RequestHandler = async (req, res) => {

    const taskId: string = req.params.id;
    const { description, status }: UpdateTaskBody = req.body;

    if(status !== "IN_PROGRESS" && status !== "COMPLETED") {
        res.json({message: 'status should be: IN_PROGRESS or COMPLETED'});
    }

    try {
        const task: Task | null = await Task.findByPk(taskId);
        if (task) {
            task.description = description;
            task.status = status;
            task.save();

            res.json({ message: 'sucess' });
        } else {
            res.json({ message: `No such task with id: ${taskId}` });
        }
    } catch (error) {
        res.json({ message: 'Internal server Error' })
    }
}

export const removeTask: RequestHandler = async (req, res) => {
    const taskId: string = req.params.id;

    try {
        const task: Task | null = await Task.findByPk(taskId);
        if (task) {
            task.destroy();
            res.json({ message: 'sucess' });
        } else {
            res.json({ message: `No such task with id: ${taskId}` });
        }
    } catch (error) {
        res.json({ message: 'Internal server Error' })
    }
}