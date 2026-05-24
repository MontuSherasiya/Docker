import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: [
            "http://localhost:5172",
            "http://localhost:5173",
            "http://localhost:3000",

            //add production URL when deployed
        ],
        credentials: true
    }
));

//API routes
app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
});