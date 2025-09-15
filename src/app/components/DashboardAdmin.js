import Link from "next/link";

export default function Dashboard() {
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
                Gambar
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
            <tr className="border-b">
              <td className="py-4 px-6">
                image
                {/* <img src="https://via.placeholder.com/100" alt="Foto Proyek" className="w-20 h-20 object-cover rounded-lg"> */}
              </td>
              <td className="py-4 px-6">Desain Grafis</td>
              <td className="py-4 px-6 ">
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
