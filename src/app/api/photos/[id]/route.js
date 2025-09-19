import { PrismaClient } from "@prisma/client";
// import { unlink } from "fs";
import path from "path";
import { unlink } from "fs/promises";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  try {
    const id = parseInt(params.id);

    // console.log(id);

    // find photo to delete
    const photo = await prisma.photo.findUnique({
      where: { id },
    });

    // delete record from DB
    const deletedPhoto = await prisma.photo.delete({
      where: { id },
    });

    // delete from directory project
    const filePath = path.join(process.cwd(), "public", photo.filePath);
    try {
      await unlink(filePath);
    } catch (err) {
      console.warn("File tidak ditemukan : ", err.message);
    }

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
