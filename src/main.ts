import 'dotenv/config';
import 'reflect-metadata'; 
import { app } from '@infra/http/app'; 
import { connectDB } from '@infra/database';

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(port, () => {
      console.log(`[SERVER] Server is running on port ${port}`);
    });

  } catch (error) {
    console.error('[SERVER] Failed to start server', error);
  }
};

startServer();