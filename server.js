import express from 'express';
import cors from 'cors';
import securityRoutes from './routes/security.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/security', securityRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente.');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
