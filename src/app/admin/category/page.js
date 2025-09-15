"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function () {
  const [categories, setCategories] = useState([]);
  //
  async function fetchCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="mt-5 mx-52">
        <div className="flex justify-end">
          <Link
            href="/admin/category/add-category"
            className="bg-green-600 px-6 py-3 rounded-xl text-white font-semibold hover:bg-green-500">
            Tambah kategori
          </Link>
        </div>

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
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
