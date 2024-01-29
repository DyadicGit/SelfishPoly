import express from 'express';
import { apiNotes } from "./src/apiNotes";

const app = express();
const port = 5000;

app.use(express.json());

// CORS
app.use((req, res, next) => {
    const ALLOWED_CORS_ORIGIN = 'http://localhost:3000';
    const cacheHours = 60; // 1 minute

    res.header('Access-Control-Allow-Origin', ALLOWED_CORS_ORIGIN || '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'false');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Max-Age', `${cacheHours}`);
    next();
});

// For Handling unhandled promise rejection
process.on('unhandledRejection', (reason: any) => {
    console.log('[Unhandled Rejection]::', reason.message);
    throw reason;
});
process.on('uncaughtException', (error) => {
    console.log('[Uncaught Exception]::', error.message);
    throw error;
});

app.get('/', (req, res) => { res.send(`<h1>SelfishPoly server is running</h1>`); });
app.use(apiNotes);

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
