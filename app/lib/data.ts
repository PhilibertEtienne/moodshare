import { sql } from "@vercel/postgres";
import { User, Posts } from "./definition";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchUsers() {
  noStore();
  try {
    const data = await sql<User>`SELECT * FROM users`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users data.");
  }
}
