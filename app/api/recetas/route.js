// app/api/recetas/route.js
import { prisma } from "../../../lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import fs from "fs";
import path from "path";

// Para poder usar fs en App Router
export const runtime = "nodejs";

export async function GET() {
  try {
    const recetas = await prisma.recipe.findMany({
      include: { steps: { orderBy: { order: "asc" } } },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(recetas);
  } catch (err) {
    console.error("Error al obtener recetas:", err);
    return Response.json({ error: "Error al obtener recetas" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const stepsRaw = formData.get("steps");
    const imageFile = formData.get("image"); // 👈 viene del input name="image"

    if (!title || !title.trim()) {
      return Response.json(
        { error: "El título es obligatorio" },
        { status: 400 }
      );
    }

    // steps viene como JSON.stringify(steps.filter(Boolean))
    let steps = [];
    if (stepsRaw) {
      try {
        const parsed = JSON.parse(stepsRaw);
        if (Array.isArray(parsed)) {
          steps = parsed.filter((s) => typeof s === "string" && s.trim());
        }
      } catch {
        // si falla el parse, dejamos steps vacío
        steps = [];
      }
    }

    // -------- Guardar imagen en /public/uploads --------
    let imagePath = null;

    if (imageFile && imageFile.size > 0) {
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      // crear carpeta si no existe
      if (!fs.existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const safeName = imageFile.name.replace(/\s+/g, "-");
      const filename = `${Date.now()}-${safeName}`;

      const fullPath = path.join(uploadDir, filename);
      await writeFile(fullPath, buffer);

      // ruta pública que se guarda en la BD
      imagePath = `/uploads/${filename}`;
    }

    const receta = await prisma.recipe.create({
      data: {
        title,
        description,
        image: imagePath,
        steps: {
          create: steps.map((text, index) => ({
            order: index + 1,
            text,
          })),
        },
      },
    });

    return Response.json(receta, { status: 201 });
  } catch (err) {
    console.error("Error al crear receta:", err);
    return Response.json({ error: "Error al crear receta" }, { status: 500 });
  }
}
