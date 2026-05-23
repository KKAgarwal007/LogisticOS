import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/data', apiRoutes);

app.get('/', (req, res) => {
  res.send('Aether Logistix API is running...');
});

export default app;
