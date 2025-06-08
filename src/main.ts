// Roda a aplicação

import dotnv from "dotenv";
import app from "./presentation/http/server";

dotnv.config();

const port = process.env.LOCALPORT;

app.listen(port || 3000, () => {
    console.log(`Servidor rodando em: http://localhost:${port || 3000}`);
})
