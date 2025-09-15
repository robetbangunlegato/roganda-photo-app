export default function AddPhoto() {
  return (
    <>
      <div className="mt-5 mx-52">
        <label className="block mb-2 text-gray-900" htmlFor="file_input">
          Upload file
        </label>
        <input
          className="block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-200 focus:outline-none p-2"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
        />
        <p className="mt-1 text-gray-500" id="file_input_help">
          JPG (MAX. 800x400px).
        </p>
        <button className="bg-green-600 rounded-xl font-semibold text-white px-6 py-3 text mt-5">
          Upload
        </button>
      </div>
    </>
  );
}
