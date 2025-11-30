import { prisma } from "../../../lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import fs from "fs";
import path from "path";

export const runtime = "nodejs"; // por si estás en app router

export async function POST(req) {
  const form = await req.formData();

  const title = form.get("title");
  const description = form.get("description");
  const steps = JSON.parse(form.get("steps"));
  const imageFile = form.get("image");

  // Validación básica
  if (!title || !title.trim()) {
    return new Response(JSON.stringify({ error: "El título es obligatorio" }), {
      status: 400,
    });
  }

  // ---- Guardar imagen en /public/uploads ----
  let imagePath = null;

  if (imageFile && imageFile.size > 0) {
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Crear carpeta si no existe (aunque ya exista, esto no molesta)
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = imageFile.name.replace(/\s+/g, "-");
    const filename = `${Date.now()}-${safeName}`;

    // Ruta física correcta dentro de public/uploads
    const fullPath = path.join(uploadDir, filename);
    await writeFile(fullPath, buffer);

    // Ruta pública que se guarda en la BD
    imagePath = `/uploads/${filename}`;
  }

  // Guardar la receta
  const receta = await prisma.recipe.create({
    data: {
      title,
      description,
      image: imagePath,
      steps: {
        create: steps.map((t, i) => ({
          text: t,
          order: i + 1,
        })),
      },
    },
  });

  return new Response(JSON.stringify(receta), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
