import { PrismaBetterSQLite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient, SalesProduct } from "../generated/prisma/client";
import * as fs from "fs";
import * as path from "path";
import { z } from "zod";
import {
  SalesProductCreateArgs,
  SalesProductCreateInput,
} from "../generated/prisma/models";

const adapter = new PrismaBetterSQLite3({
  url: "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

function validate(a: any): a is SalesProductCreateInput {
  const schema = z.object({
    productName: z.string(),
  }) satisfies z.ZodType<SalesProductCreateInput>;

  const result = schema.safeParse(a);

  return result.success;
}

async function main() {
  try {
    const jsonPath = path.join(process.cwd(), "./data/sales_products.json");
    const salesData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    for (const record of salesData) {
      if (validate(record)) {
        await prisma.salesProduct.create({
          data: {
            productName: record.productName,
            sizes: {
              create: record.sizes,
            },
          },
        });
      }
    }

    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
