import { prisma } from "../../../../lib/prisma";

export async function GET(_, { params }) {
  const id = Number(params.id);
  const receta = await prisma.recipe.findUnique({
    where: { id },
    include: { steps: { orderBy: { order: "asc" } } }
  });
  if (!receta) return new Response("Not found", { status: 404 });
  return Response.json(receta);
}

