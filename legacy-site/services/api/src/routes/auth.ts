import { Router } from 'express';

const router = Router();

// Placeholder auth routes
router.post('/login', (req, res) => {
  res.json({ success: true, message: 'Auth route working' });
});

export default router;
