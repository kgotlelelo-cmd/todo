import { Router } from "express";
import { getUserDetails, getUserTasks, updateUserDetails } from "../controllers/users";

const router = Router();


router.get('/user/:email',getUserDetails);
router.get('/user/task/:email',getUserTasks);
router.put('/user/:id',updateUserDetails);
router.delete('/user/:id');