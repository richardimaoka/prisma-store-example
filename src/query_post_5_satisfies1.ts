import { PrismaBetterSQLite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";
import { PostGetPayload, PostSelect } from "../generated/prisma/models";

const adapter = new PrismaBetterSQLite3({
  url: "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const postSelect = {
      title: true,
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    } satisfies PostSelect;

    type MyPostPayload = PostGetPayload<{ select: typeof postSelect }>;

    const result = await prisma.post.findUnique({
      where: { id: 3 },
      select: postSelect,
    });

    result?.author.email;
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
