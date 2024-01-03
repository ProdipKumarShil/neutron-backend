const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000
const cors = require('cors');
require('dotenv').config();
const app = express()
app.use(express.json())
app.use(cors())

const contactRoute = require('./routes/contact')

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.ta7i6kc.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => console.log('DB connected'))
  .catch(e => console.log(e.message))

app.get('/', async(req, res) => {
  res.send('server is running')
})

app.use('/contact', contactRoute)

app.listen(PORT, () => {
  console.log('server is running on ', PORT)
})
