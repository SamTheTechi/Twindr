import { Client } from "pg"
export const pgClient = new Client({
  user: "sysAdmin",
  host: "localhost",
  password: "sam",
  database: "auth",
  port: 5432
})

pgClient.connect();
