import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

//API routes
app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});