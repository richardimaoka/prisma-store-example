import { PrismaBetterSQLite3 } from "@prisma/adapter-better-sqlite3";
import { Prisma, PrismaClient } from "../generated/prisma/client";
import { PostCountAggregateInputType } from "../generated/prisma/models";

const adapter = new PrismaBetterSQLite3({
  url: "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const userFindMany = {
      include: {
        posts: true,
      },
    } satisfies Prisma.UserFindManyArgs; // これを消すとType error

    const result = await prisma.user.findMany(userFindMany);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
