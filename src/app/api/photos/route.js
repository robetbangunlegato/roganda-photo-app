import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const photos = await prisma.photo.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        uploadedAt: "desc", // Urutkan dari yang terbaru
      },
    });

    return NextResponse.json(photos, { status: 200 });
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server: " + error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const categoryName = formData.get("category_name");

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File tidak ada" },
        { status: 400 }
      );
    }

    // Simpan kategori
    const category = await prisma.category.findFirst({
      where: { name: categoryName },
    });

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Kategori tidak ditemukan" },
        { status: 400 }
      );
    }

    // Simpan file ke public/uploads
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    await writeFile(filePath, buffer);

    const photo = await prisma.photo.create({
      data: {
        filePath: `/uploads/${fileName}`,
        categoryId: category.id,
      },
    });

    return NextResponse.json(
      { success: true, message: "Foto berhasil diunggah!", photo },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading photo:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server: " + error.message,
      },
      { status: 500 }
    );
  }
}
