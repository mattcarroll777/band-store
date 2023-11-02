import { sql } from '@vercel/postgres';

//Adds new row to PostreSQL DB
//In TABLE: Tshirts
//Adds Rows with: tshirtName, tshirtImg, tshirtPrice as Name, Img, Price

export default async function handler(request, response) {
  try {
    const tshirtName = request.query.tshirtName;
    const tshirtImg = request.query.tshirtImg;
    const tshirtPrice = request.query.tshirtPrice;
    if (!tshirtName || !tshirtImg || !tshirtPrice)
      throw new Error('tshirt name, img url, and price required');
    await sql`INSERT INTO Tshirts (Name, Img, Price) VALUES (${tshirtName}, ${tshirtImg}, ${tshirtPrice});`;
  } catch (error) {
    return response.status(500).json({ error });
  }

  // Once row is created show all tshirts
  const tshirts = await sql`SELECT * FROM Tshirts;`;
  return response.status(200).json({ tshirts });
}
