import { PostCreateInput } from "../generated/prisma/models";
import { z } from "zod";

const schema: z.ZodType<PostCreateInput> = z.object({
  title: z.string(),
  content: z.string().nullish(),
  published: z.boolean().optional(),
});

// We should be able to call methods like `pick` and `omit` on `z.object()` schemas, but we get an error:
// TS Error: Property 'pick' does not exist on type 'ZodType<PostCreateInput, ZodTypeDef, PostCreateInput>'.
const titleOnly = schema.pick({ title: true });

const schema2 = z.object({
  title: z.string(),
  content: z.string().nullish(),
  published: z.boolean().optional(),
});

const titleOnly2 = schema2.pick({ title: true });
