import { Router } from 'express';

const router = Router();

router.get('/profile', (req, res) => {
  res.json({ success: true, data: { name: 'Test User' } });
});

export default router;
