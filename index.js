import dotenv from 'dotenv';
import app from './app/index.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

app.listen(PORT, (req, res) =>
  console.log(`🔥🔥🔥 LANDR is up and running on port ${PORT} 🔥🔥🔥\n`)
);
