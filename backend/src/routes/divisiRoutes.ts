import {Router} from "express";
import{
    pilihDivisi,
    getAllDivisi,
    getOneDivisi
} from "@/controllers/divisiControllers";
import { authenticateToken } from "@middlewares/auth";

const router = Router();

router.post('/:slug/choose', authenticateToken, pilihDivisi);

router.get('/', getAllDivisi);
router.get('/:slug', getOneDivisi);



export default router;