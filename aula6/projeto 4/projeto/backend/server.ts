import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routerProduto from './routes/produtoRoutes';
import routerCategoria from './routes/categoriaRoutes';
const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(cors());
// Middleware to parse JSON
app.use(express.json());
app.use("/api",routerProduto)
app.use("/api",routerCategoria)



// Start the server
app.listen(PORT, () => {
    console.log(`Server rodando na porta:  http://localhost:${PORT}`);
});