import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  // Ruta al JSON dentro de la carpeta /data
  const file = path.join(process.cwd(), "data", "recetas.json");

  // Leer y parsear el archivo
  const raw = fs.readFileSync(file, "utf-8");
  const recetas = JSON.parse(raw);

  // Insertar cada receta con sus pasos
  for (const r of recetas) {
    await prisma.recipe.create({
      data: {
        title: r.titulo,
        image: r.imagen,
        description: r.descripcion,
        category: r.categoria ?? null,
        steps: {
          create: r.pasos.map((p, idx) => ({
            order: idx + 1,
            text: p,
          })),
        },
      },
    });
  }

  console.log(`Seed completado: ${recetas.length} recetas cargadas correctamente`);
}

main()
  .catch((e) => {
    console.error("Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

