import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import requireAuth from '../middlewares/require_auth.js';
import attachUser from '../middlewares/attach_user.js';
import usersRouter from '../ressources/users/users_router.js';
import devicesRouter from '../ressources/devices/devices_router.js';
import requestsRouter from '../ressources/requests/requests_router.js';
import reportsRouter from '../ressources/reports/reports_router.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
// app.disable('x-powered-by');

// Routes
app.use('/api/users', usersRouter);
app.use('/api/devices', requireAuth, attachUser, devicesRouter);
app.use('/api/requests', requireAuth, attachUser, requestsRouter);
app.use('/api/reports', requireAuth, attachUser, reportsRouter);

app.get('/', (req, res) =>
  res.status(200).json({ message: 'Welcome to Landr API' })
);

export default app;
