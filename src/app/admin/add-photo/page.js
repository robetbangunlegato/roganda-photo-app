"use client";
import { useEffect, useState } from "react";

export default function AddPhoto() {
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // get categories data
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  async function handleFotoSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const formData = new FormData(e.target);

      const res = await fetch("/api/photos", {
        method: "POST",
        body: formData,
        // headers tidak diperlukan untuk FormData, browser akan set otomatis
      });

      // Periksa content type sebelum parsing JSON
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await res.json();

        if (res.ok) {
          setMessage(result.message);
          // Reset form
          e.target.reset();
        } else {
          setMessage(result.message || "Gagal mengunggah foto");
        }
      } else {
        // Jika response bukan JSON, tampilkan error umum
        const text = await res.text();
        setMessage(`Error: ${res.status} - ${text.substring(0, 100)}...`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Terjadi kesalahan jaringan atau server");
    } finally {
      setIsLoading(false);

      // sembunyikan pesan setelah 5 detik
      setTimeout(() => setMessage(""), 10000);
    }
  }

  return (
    <>
      <div className="mt-5 mx-52">
        {message && (
          <div
            className={`p-3 mb-4 rounded ${
              message.includes("berhasil")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleFotoSubmit} encType="multipart/form-data">
          <label className="block mb-2 text-gray-900" htmlFor="file">
            Upload file
          </label>
          <input
            accept="image/*"
            className="block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
            aria-describedby="file_input_help"
            id="file"
            name="file"
            type="file"
            required
          />
          <p className="mt-1 text-gray-500" id="file_input_help">
            JPG, PNG, GIF (MAX. 800x400px).
          </p>

          <div className="mt-4">
            <label className="block mb-2">Pilih Kategori</label>
            <select
              name="category_name"
              className="border p-2 w-full rounded-lg"
              required>
              <option value="">-- Pilih Kategori --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-green-600 rounded-xl font-semibold text-white px-6 py-3 text mt-5 disabled:bg-gray-400"
            type="submit"
            disabled={isLoading}>
            {isLoading ? "Mengunggah..." : "Upload"}
          </button>
        </form>
      </div>
    </>
  );
}
