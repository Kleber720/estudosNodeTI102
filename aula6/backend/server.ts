import express from 'express';
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());



// Start the server
app.listen(PORT, () => {
    console.log(`Server rodando na porta:  http://localhost:${PORT}`);
});