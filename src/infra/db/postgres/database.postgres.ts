// Configuracao do banco de dados
import { Pool, PoolConfig, QueryResultRow } from "pg"
import dotenv from "dotenv";

dotenv.config();

const dbconfig: PoolConfig = {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
    max: 20, // Número máximo de clientes no pool
    idleTimeoutMillis: 30000, // Tempo em ms que um cliente pode ficar ocioso
}

const pool = new Pool(dbconfig);

pool.on('connect', () => {
    console.log("Conetado com postgresSQL!");
})

pool.on('error', (err, client) => {
    console.log("Erro ao conectar com postgresSQL!" + err);
    process.exit(-1);
})

// Exportando a funcao do banco de dados de forma encapsulada/abstrata;
// Quando quero fazer uma comunicação com o banco de dados nao usamos o pool diretamente, o que da mais seguranca
// Pasamos a string dql e os valores em array
// Facilitando a mudanca de banco de dados de preciso
export const db = {
    // Usando o extends para receber um type valido, ele nao aceita qualquer type.
    query: <T extends QueryResultRow>(text: string, params?: any[]) => pool.query<T>(text, params),
};