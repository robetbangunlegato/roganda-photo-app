export default function Dashboard() {
  return (
    <>
      <div className="mt-5 flex justify-evenly">
        <a
          href=""
          className="bg-green-600 px-6 py-3 rounded-xl text-white font-semibold hover:bg-green-500 ">
          Tambah foto
        </a>
        <a
          href=""
          className="bg-cyan-600 px-6 py-3 rounded-xl text-white font-semibold hover:bg-cyan-500">
          Tambah kategori
        </a>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Gambar
              </th>
              <th scope="col" className="py-3 px-6">
                Kategori
              </th>
              <th scope="col" className="py-3 px-6 text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6">
                image
                {/* <img src="https://via.placeholder.com/100" alt="Foto Proyek" className="w-20 h-20 object-cover rounded-lg"> */}
              </td>
              <td className="py-4 px-6">Desain Grafis</td>
              <td className="py-4 px-6 text-right">
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                  Hapus
                </button>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6">
                image
                {/* <img src="https://via.placeholder.com/100" alt="Foto Proyek" className="w-20 h-20 object-cover rounded-lg"> */}
              </td>
              <td className="py-4 px-6">Fotografi</td>
              <td className="py-4 px-6 text-right">
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
