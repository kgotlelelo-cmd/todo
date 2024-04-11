import { RequestHandler } from "express";
import { User } from "../models/user";

interface UserBody {
    firstName: string,
    lastName: string,
    email: string
}

export const getUserDetails: RequestHandler = async (req, res) => {
    const email: string = req.params.email;

    try {
        const user: User | null = await User.findOne({ where: { email: email } });
        if (user) {
            res.json(user.toJSON());
        } else {
            res.json({ message: `No user with email: ${email}` });
        }
    } catch (error) {
        res.json({ message: 'Internal server Error' });
    }
}

export const getUserTasks: RequestHandler = async (req, res) => {
    const email: string = req.params.email;

    try {
        const user: User | null = await User.findOne({ where: { email: email } });
        if (user) {
            res.json(user.getTasks());
        } else {
            res.json({ message: `No user with email: ${email}` });
        }
    } catch (error) {
        res.json({ message: 'Internal server Error' });
    }
}

export const updateUserDetails: RequestHandler = async (req, res) => {

    const userId: string = req.params.id;

    const { firstName, lastName, email }: UserBody = req.body;

    try {
        const user: User | null = await User.findByPk(userId);
        if (user) {
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.save();
            res.json({ message: 'success' });
        } else {
            res.json({ message: `No user with id: ${userId}` });
        }
    } catch (error) {
        res.json({ message: 'Internal server Error' });
    }
}

export const removeUser: RequestHandler = async (req, res) => {
    const userId: string = req.params.id;

    try {
        const user: User | null = await User.findByPk(userId);
        if (user) {
            user.destroy();
            res.json({ message: 'success' });
        } else {
            res.json({ message: `No user with id: ${userId}` });
        }
    } catch (error) {
        res.json({ message: 'Internal server Error' });
    }
}