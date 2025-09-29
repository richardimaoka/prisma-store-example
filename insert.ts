import { PrismaBetterSQLite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "./generated/prisma/client";
import * as fs from "fs";
import * as path from "path";

const adapter = new PrismaBetterSQLite3({
  url: "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const jsonPath = path.join(process.cwd(), "./data/insert.json");
    const salesData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    for (const record of salesData) {
      await prisma.saleRecord.create({
        data: {
          productName: record.productName,
          quantity: record.quantity,
          price: record.price,
          size: record.size,
          color: record.color,
          storeName: record.storeName,
          storeAddress: record.storeAddress,
          createdAt: new Date(record.createdAt), // Convert string to Date object
        },
      });
    }
    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
