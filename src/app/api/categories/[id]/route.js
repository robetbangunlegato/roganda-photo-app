import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  try {
    const id = parseInt(params.id);

    const deletedCategory = await prisma.category.delete({
      where: { id },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Kategori berhasil dihapus!",
        category: deletedCategory,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Gagal menghapus kategori" }),
      { status: 500 }
    );
  }
}
