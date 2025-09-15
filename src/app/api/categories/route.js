import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//
export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
  return new Response(JSON.stringify(categories), { status: 200 });
}

//
export async function POST(req) {
  const formData = await req.formData();
  const category_name = formData.get("category_name");

  if (!category_name) {
    return new Response(
      JSON.stringify({ message: "Nama kategori wajib diisi" }),
      { status: 400 }
    );
  }

  const newCategory = await prisma.category.create({
    data: { name: category_name },
  });

  return new Response(
    JSON.stringify({
      success: true,
      message: "Kategori berhasil ditambahkan!",
      category: newCategory,
    }),
    { status: 201 }
  );
}
