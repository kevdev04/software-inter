const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const dashboardRoutes = require('./src/routes/dashboard.routes');
const usersRoutes = require('./src/routes/users.routes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/dashboard', dashboardRoutes);
app.use('/usuarios', usersRoutes);

const authRoutes = require('./src/routes/auth.routes');
app.use('/auth', authRoutes);

const errorMiddleware = require('./src/middlewares/error.middleware');
app.use(errorMiddleware);

const reportesRoutes = require('./src/routes/reportes.routes');
app.use('/reportes', reportesRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

