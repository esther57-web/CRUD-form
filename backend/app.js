const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product');
const path = require('path');
const cors = require('cors');
require('dotenv').config(); 

const app = express();

mongoose.connect(`mongodb+srv://kamardineossete:${process.env.MONGO_PASSWORD}@form.8u8im.mongodb.net/?retryWrites=true&w=majority&appName=form`)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  
app.use(express.json());

app.use(cors())

app.use('/api/products', productRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;