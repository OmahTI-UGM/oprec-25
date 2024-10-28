import {Router} from "express";
import{
    login,
    register,
    refresh,
    logout,
    getDivisi,
    getWawancara
} from "@/controllers/userControllers";
import { authenticateToken } from "@middlewares/auth";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateToken, logout);
router.get('/refresh', refresh);
router.get('/divisi', authenticateToken, getDivisi);
router.get('/wawancara', authenticateToken, getWawancara);

export default router;