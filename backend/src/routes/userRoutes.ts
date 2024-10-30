import {Router} from "express";
import{
    login,
    register,
    refresh,
    logout,
    getDivisi,
    getWawancara,
    validate,
    requestPasswordReset,
    resetPassword
} from "@/controllers/userControllers";
import { authenticateToken } from "@middlewares/auth";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateToken, logout);
router.post('/reqest-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

router.get('/validate', authenticateToken, validate);
router.get('/refresh', refresh);
router.get('/divisi', authenticateToken, getDivisi);
router.get('/wawancara', authenticateToken, getWawancara);

export default router;