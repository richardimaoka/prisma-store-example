import { PrismaBetterSQLite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";
import { PostCountAggregateInputType } from "../generated/prisma/models";

const adapter = new PrismaBetterSQLite3({
  url: "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const postSelect = {
      title: true,
      published: true,
    } satisfies PostCountAggregateInputType; // これを消すとType error

    const result = await prisma.post.count({
      select: postSelect,
    });

    result.title;
    result.published;
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
