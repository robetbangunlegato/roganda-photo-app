export default function AddCategory() {
  return (
    <>
      <div className="mx-52 mt-5">
        <form method="POST" action="/api/categories">
          <label className="block mb-2 text-gray-900" htmlFor="category_name">
            Nama kategori
          </label>
          <input
            type="text"
            id="category_name"
            name="category_name"
            placeholder="Masukkan teks di sini..."
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none focus:ring-1"
          />
          <button
            className="bg-green-600 px-6 py-3 mt-5 rounded-xl text-white font-semibold hover:bg-green-500"
            type="submit">
            Simpan
          </button>
        </form>
      </div>
    </>
  );
}
