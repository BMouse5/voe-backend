require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const cors = require('cors');
const corsOptions = {
    origin: 'https://voe-client-navy.vercel.app',  // Порт, на котором работает ваше Vue приложение
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Разрешённые методы
    allowedHeaders: ['Content-Type']  // Разрешённые заголовки
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors(corsOptions)); 
app.use(bodyParser.json());
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/consultations', consultationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
