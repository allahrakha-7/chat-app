import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/messages.route.js';

dotenv.config();

const app = express();


app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.use("/api/auth/", authRoutes);
app.use("/api/messages/", messageRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running successfully on the port ' + PORT + "!");
});
