import { prisma } from "../../../lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  const form = await req.formData();

  const title = form.get("title");
  const description = form.get("description");
  const steps = JSON.parse(form.get("steps"));
  const imageFile = form.get("image");

  //   Guardar imagen en /public/uploads ---
  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const imagePath = `/uploads/${Date.now()}-${imageFile.name}`;
  await writeFile(path.join("public", imagePath), buffer);

  // Guardar la receta 
  const receta = await prisma.recipe.create({
    data: {
      title,
      description,
      image: imagePath,
      steps: {
        create: steps.map((t, i) => ({
          text: t,
          order: i + 1
        })),
      },
    },
  });

  return Response.json(receta);
}
