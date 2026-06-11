import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
dotenv.config();

import supabase from "../src/config/supabase.js";

interface SeedUser {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: string;
}

const generateUsers = (count: number): SeedUser[] => {
  return Array.from({ length: count }, () => ({
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    // BUG FIX: original generated non-Indian phone numbers (any 10 digits).
    // Seeder data now starts with a valid Indian prefix (6-9).
    phone: String(faker.number.int({ min: 6000000000, max: 9999999999 })),
    dob: faker.date
      .birthdate({ min: 18, max: 60, mode: "age" })
      .toISOString()
      .split("T")[0]!,
  }));
};

const seedUsers = async (): Promise<void> => {
  try {
    const users = generateUsers(5000);
    const batchSize = 100;

    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      const { error } = await supabase.from("users").insert(batch);

      if (error) {
        console.error(`Batch ${Math.floor(i / batchSize) + 1} failed:`, error);
        return;
      }

      console.log(`Inserted ${Math.min(i + batchSize, users.length)} users`);
    }

    console.log("✅ 5000 users inserted successfully");
  } catch (error) {
    console.error("Seeder error:", error);
  }
};

await seedUsers();
