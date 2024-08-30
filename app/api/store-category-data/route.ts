// pages/api/categories/store-data.ts
import { NextApiRequest, NextApiResponse } from "next";
import { saveCategoriesToCache } from "@/lib/redis"; // Import your cache methods

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // export default async function handler() {

  try {
    const categoriesData = req.body;
    // console.log(categoriesData);

    await saveCategoriesToCache(categoriesData);
    res.status(200).json({ message: "Categories data stored successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to store data" });
  }
}
