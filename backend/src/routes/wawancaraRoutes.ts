import { Router } from 'express';
import {
    pilihWaktuWawancaraOti,
    pilihWaktuWawancaraHima
} from '@controllers/wawancaraControllers';
import { authenticateToken } from '@middlewares/auth';
import { sudahMemilihOti, sudahMemilihHima } from '@middlewares/sudahMemilih';

const router = Router();

router.post('/oti/:wawancaraId', authenticateToken, sudahMemilihOti, pilihWaktuWawancaraOti);
router.post('/hima/:wawancaraId', authenticateToken, sudahMemilihHima, pilihWaktuWawancaraHima);
export default router;