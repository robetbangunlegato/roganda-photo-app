import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const categoriesFile = path.join(process.cwd(), "data", "categories.json");

// helper: pastikan file/dir ada
function ensureFile() {
  const dir = path.dirname(categoriesFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(categoriesFile)) fs.writeFileSync(categoriesFile, "[]");
}

export async function GET() {
  try {
    ensureFile();
    const raw = fs.readFileSync(categoriesFile, "utf8");
    const categories = JSON.parse(raw || "[]");
    return NextResponse.json(categories);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    ensureFile();

    const contentType = (req.headers.get("content-type") || "").toLowerCase();
    let categoryName = null;

    if (contentType.includes("application/json")) {
      const body = await req.json();
      categoryName = body.category_name || body.name;
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      const params = new URLSearchParams(text);
      categoryName = params.get("category_name") || params.get("name");
    } else {
      // fallback: coba parsing text sebagai urlencoded
      const text = await req.text();
      const params = new URLSearchParams(text);
      categoryName = params.get("category_name") || params.get("name");
    }

    if (!categoryName || categoryName.trim() === "") {
      return NextResponse.json(
        { message: "Nama kategori wajib diisi" },
        { status: 400 }
      );
    }

    const raw = fs.readFileSync(categoriesFile, "utf8");
    const categories = JSON.parse(raw || "[]");

    const newCategory = {
      id: Date.now(),
      name: categoryName.trim(),
    };

    categories.push(newCategory);
    fs.writeFileSync(
      categoriesFile,
      JSON.stringify(categories, null, 2),
      "utf8"
    );

    return NextResponse.json(newCategory, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
