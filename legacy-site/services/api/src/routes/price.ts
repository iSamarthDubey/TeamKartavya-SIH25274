import { Router } from 'express';

const router = Router();

router.get('/current', (req, res) => {
  res.json({ success: true, data: { price: 5500, commodity: 'mustard' } });
});

export default router;
