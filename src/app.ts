import express from 'express';
import { router } from './routes';
import authApp from './middlewares/authenticate'; // Import authApp instead of app

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(authApp);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

