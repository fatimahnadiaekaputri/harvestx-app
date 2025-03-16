import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,          // Username PostgreSQL
  host: process.env.DB_HOST,          // Host dari Aiven
  database: process.env.DB_NAME,      // Nama database
  password: process.env.DB_PASSWORD,  // Password
  port: Number(process.env.DB_PORT),  // Port PostgreSQL (biasanya 5432)
});

export default pool;
