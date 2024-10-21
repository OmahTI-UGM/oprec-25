import {Router} from "express";
import{
    login,
    register,
    refresh,
    logout
} from "@/controllers/userControllers";
import { authenticateToken } from "@middlewares/auth";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/refresh', refresh);
router.post('/logout', authenticateToken, logout);

export default router;