import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import iamRoutes from './routes/iam';
import accountingRoutes from './routes/accounting';
import hotelRoutes from './routes/hotel';
import tourRoutes from './routes/tour';
import b2bRoutes from './routes/b2b';
import corporateRoutes from './routes/corporate';
import offerRoutes from './routes/offer';
import financeRoutes from './routes/finance';
import reportRoutes from './routes/report';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/iam', iamRoutes);
app.use('/api/accounting', accountingRoutes);
app.use('/api/hotel', hotelRoutes);
app.use('/api/tour', tourRoutes);
app.use('/api/b2b', b2bRoutes);
app.use('/api/corporate', corporateRoutes);
app.use('/api/offer', offerRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/report', reportRoutes);

app.get('/health', (req: express.Request, res: express.Response) => {
  res.json({ status: 'OK', message: 'Digital Tours ERP Backend Running' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
