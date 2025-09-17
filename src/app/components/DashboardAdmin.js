"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPhotos();
    fetchCategories();
  }, []);

  // get photos
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

  // get categories
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

  // delete photos & modal delete
  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setShowModal(false);
  };

  const handleDelete = async () => {
    if (!selectedPhoto) return;

    try {
      const res = await fetch(`/api/photos/${selectedPhoto.id}`, {
        method: "DELETE",
      });

      const result = await res.json();
      if (res.ok) {
        setShowModal(false);
        setMessage(result.message); // tampilkan pesan sukses
        fetchPhotos(); // refresh list
      } else {
        setMessage(result.message || "Gagal menghapus");
      }
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <>
      <div className="mt-5 mx-52">
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

        {/* alert */}
        {message && (
          <div
            className="flex items-center p-4 my-4 text-sm text-green-800 rounded-lg bg-gray-600 dark:text-green-400"
            role="alert">
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Success</span>
            <div>
              <span className="font-medium">{message}</span>
            </div>
          </div>
        )}

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
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
                  <td colSpan={3} className="text-lg">
                    Belum ada foto!
                  </td>
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
                      <button
                        onClick={() => openModal(photo)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* modal delete photo */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Konfirmasi Penghapusan
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Apakah Anda yakin ingin menghapus item ini? Tindakan ini tidak
                  dapat dibatalkan.
                </p>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
