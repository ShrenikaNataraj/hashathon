import express from 'express';
import cors from 'cors';
import db from './models';
import dotenv from 'dotenv';
import router from './routes';


const PORT = process.env.PORT || 3000;

// Get environment variables
dotenv.config();

// Create the express server and configure it to use json
const app = express();
app.use(express.json());

// Configure cors policy
app.use(cors());

// app.use('/', routes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});

app.use('/api', router);
