import {Router} from "express";
import{
    pilihDivisi,
    getAllDivisi,
    getOneDivisi
} from "@/controllers/divisiControllers";
import{
    submitPenugasan,
    updateTugas,
    existingSubmission
} from "@controllers/penugasanControllers"
import { authenticateToken } from "@middlewares/auth";

const router = Router();

router.post('/:slug/choose', authenticateToken, pilihDivisi);
router.post('/:slug/submit', authenticateToken, submitPenugasan);
router.put('/:id/update', authenticateToken, updateTugas);

router.get('/', getAllDivisi);
router.get('/:slug', getOneDivisi);
router.get('/:slug/penugasan', authenticateToken, existingSubmission);

export default router;