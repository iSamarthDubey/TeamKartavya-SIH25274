import { Router } from 'express';

const router = Router();

router.get('/list', (req, res) => {
  res.json({ success: true, data: [] });
});

export default router;
