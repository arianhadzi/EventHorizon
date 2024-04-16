import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Homepage');
});

router.get('/users', (req, res) => {
    res.send('Users Page');
  });

export default router;