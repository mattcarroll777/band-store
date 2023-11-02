import { sql } from '@vercel/postgres';

// Creates Table Tshirts in Postgres db, check Vercel data
export default async function handler(request, response) {
  try {
    const result =
      await sql`CREATE TABLE Tshirts ( Name varchar(255), Img varchar(255), Price int );`;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
