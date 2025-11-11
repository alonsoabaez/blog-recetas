import { prisma } from "@/lib/prisma";

export async function GET() {
  const recetas = await prisma.recipe.findMany({
    include: { steps: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" }
  });
  return Response.json(recetas);
}
