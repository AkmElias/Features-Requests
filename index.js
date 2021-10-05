import express from 'express';
import path from 'path'
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT}`
  )
);