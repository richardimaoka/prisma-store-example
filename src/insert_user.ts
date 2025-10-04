import { PrismaBetterSQLite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";
import { UserCreateInput } from "../generated/prisma/models";

const adapter = new PrismaBetterSQLite3({
  url: "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  let includePosts: boolean = true;
  let user: UserCreateInput;

  // Check if posts should be included in the query
  if (includePosts) {
    user = {
      email: "elza@prisma.io",
      name: "Elza Prisma",
      posts: {
        create: {
          title: "Include this post!",
        },
      },
    };
  } else {
    user = {
      email: "elsa@prisma.io",
      name: "Elsa Prisma",
    };
  }

  // Pass 'user' object into query
  const createUser = await prisma.user.create({ data: user });
}

main();
