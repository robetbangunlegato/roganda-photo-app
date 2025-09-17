import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  try {
    const id = parseInt(params.id);

    const deletedPhoto = await prisma.photo.delete({
      where: { id },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Foto berhasil dihapus!",
        category: deletedPhoto,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Gagal menghapus foto" }),
      { status: 500 }
    );
  }
}
