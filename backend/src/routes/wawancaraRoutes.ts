import { Router } from 'express';
import {
    pilihWaktuWawancaraOti
} from '@controllers/wawancaraControllers';
import { authenticateToken } from '@middlewares/auth';
import { sudahMemilihOti } from '@middlewares/sudahMemilih';

const router = Router();

router.post('/oti/:wawancaraId', authenticateToken, sudahMemilihOti, pilihWaktuWawancaraOti);

export default router;