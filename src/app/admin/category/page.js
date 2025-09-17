"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function () {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelctedCategory] = useState(null);

  // get categories
  async function fetchCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  // add categories & alert success
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category_name", newCategory);

    const res = await fetch("/api/categories", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (res.ok) {
      setMessage(result.message); // tampilkan pesan sukses
      setNewCategory(""); // reset input
      fetchCategories(); // refresh list
    } else {
      setMessage(result.message || "Gagal menambahkan kategori");
    }
    // sembunyikan pesan setelah 3 detik
    setTimeout(() => setMessage(""), 3000);
  }

  // delete categories & modal delete
  const openModal = (category) => {
    setSelctedCategory(category);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelctedCategory(null);
    setShowModal(false);
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;

    try {
      const res = await fetch(`/api/categories/${selectedCategory.id}`, {
        method: "DELETE",
      });

      const result = await res.json();
      if (res.ok) {
        setShowModal(false);
        setMessage(result.message); // tampilkan pesan sukses
        setNewCategory(""); // reset input
        fetchCategories(); // refresh list
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
        {/* form submit category*/}
        <form method="POST" action="/api/categories" onSubmit={handleSubmit}>
          <label className="block mb-2 text-gray-900" htmlFor="category_name">
            Nama kategori
          </label>

          <div className="grid">
            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              type="text"
              id="category_name"
              name="category_name"
              placeholder="Masukkan teks di sini..."
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:ring-1"
            />
            <button
              className="bg-green-600 px-6 py-3 mt-5 rounded-xl text-white font-semibold hover:bg-green-500"
              type="submit">
              Simpan
            </button>
          </div>
        </form>

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

        {/* show categories*/}
        <div className="overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-white/80 uppercase bg-gray-500">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Kategori
                </th>
                <th scope="col" className="py-3 px-6">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-black/10">
              {categories.map((category) => (
                <tr className="border-b" key={category.id}>
                  <td className="py-4 px-6">{category.name}</td>
                  <td className="py-4 px-6 ">
                    <button
                      onClick={() => openModal(category)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* modal delete categories */}
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