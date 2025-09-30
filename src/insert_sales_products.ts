import { PrismaBetterSQLite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";
import * as fs from "fs";
import * as path from "path";

const adapter = new PrismaBetterSQLite3({
  url: "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const jsonPath = path.join(process.cwd(), "./data/sales_products.json");
    const salesData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    for (const record of salesData) {
      await prisma.salesProduct.create({
        data: {
          productName: record.productName,
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
