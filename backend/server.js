// backend/server.js
const express = require('express');
const cors = require('cors');
const estudiantesRoutes = require('./src/routes/estudiantes.routes'); // [cite: 67]

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para habilitar comunicación segura con Angular
app.use(cors());
app.use(express.json());

// Declarar las rutas base de la API de UniTrack
app.use('/api/estudiantes', estudiantesRoutes); // 

app.get('/', (req, res) => {
    res.send('🚀 Servidor de UniTrack y API de Estructuras de Datos activa.');
});

// Arrancar el Servidor
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`📡 Servidor ejecutándose en: http://localhost:${PORT}`);
    console.log(`====================================================`);
});