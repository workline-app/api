import dotenv from 'dotenv';
import app from './app/index.js';

dotenv.config();

const port = process.env.PORT;

app.listen(port);

console.log(`🔥🔥🔥 LANDR is up and running on port ${PORT} 🔥🔥🔥\n`);
