"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  // get photos
  useEffect(() => {
    fetchPhotos();
    fetchCategories();
  }, []);

  async function fetchPhotos(category = "all") {
    setLoading(true);
    try {
      const url =
        category === "all" ? "/api/photos" : `/api/photos/${category}`;

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        setPhotos(data);
      } else {
        console.error("Error fetching photos:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();

      if (res.ok) {
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  return (
    <>
      <div className="mt-5 flex justify-evenly">
        <Link
          href="/admin/add-photo"
          className="bg-green-600 px-6 py-3 rounded-xl text-white font-semibold hover:bg-green-500">
          Tambah foto
        </Link>

        <Link
          href="/admin/category"
          className="bg-cyan-600 px-6 py-3 rounded-xl text-white font-semibold hover:bg-cyan-500">
          Kategori
        </Link>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5 mx-52">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-white/80 uppercase bg-gray-500">
            <tr>
              <th scope="col" className="py-3 px-6">
                Foto
              </th>
              <th scope="col" className="py-3 px-6">
                Kategori
              </th>
              <th scope="col" className="py-3 px-6">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-black/10">
            {photos.length === 0 ? (
              <tr className="border-b">
                <td className="col-span-3">Belum ada foto!</td>
              </tr>
            ) : (
              photos.map((photo) => (
                <tr className="border-b" key={photo.id}>
                  <td className="flex justify-center">
                    <img
                      src={photo.filePath}
                      alt={`Photo ${photo.id}`}
                      className="object-cover rounded h-28 my-2"
                    />
                  </td>
                  <td className="py-4 px-6">{photo.category.name}</td>
                  <td className="py-4 px-6">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}

            {/* <tr className="border-b">
              <td className="py-4 px-6"></td>
              <td className="py-4 px-6">Desain Grafis</td>
              <td className="py-4 px-6 ">
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                  Hapus
                </button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
}
