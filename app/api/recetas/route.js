import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const recetas = await prisma.recipe.findMany({
      include: { steps: { orderBy: { order: "asc" } } },
      orderBy: { createdAt: "desc" }
    });

    return Response.json(recetas);
  } catch (err) {
    return Response.json({ error: "Error al obtener recetas" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const steps = JSON.parse(formData.get("steps"));
    const imageUrl = formData.get("imageUrl"); // si antes la guardabas así

    const receta = await prisma.recipe.create({
      data: {
        title,
        description,
        image: imageUrl,
        steps: {
          create: steps.map((text, index) => ({
            order: index + 1,
            text,
          }))
        }
      }
    });

    return Response.json(receta, { status: 201 });
  } catch (err) {
    return Response.json({ error: "Error al crear receta" }, { status: 500 });
  }
}



