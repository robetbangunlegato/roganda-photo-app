"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import Header from "./components/header.js";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* <Header /> */}
      <Main />
      {/* <h1 className="text-6xl">Halaman tentang</h1> */}
    </main>
  );
}

function Main() {
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImages] = useState(null);
  const [filter, setFilter] = useState("semua");
  const allImages = photos.flat();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // pagination states
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 5;

  useEffect(() => {
    // saat pertama load ambil data
    fetchPhotos("all", 0, true);
    fetchCategories();
  }, []);

  // get photos
  async function fetchPhotos(category = "all", pageOffset = 0, reset = false) {
    setLoading(true);
    try {
      const url =
        category === "all"
          ? `/api/photos?limit=${LIMIT}&offset=${pageOffset * LIMIT}`
          : `/api/photos/${category}?limit=${LIMIT}&offset=${
              pageOffset * LIMIT
            }`;

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        if (reset) {
          setPhotos(data.photos);
        } else {
          setPhotos((prev) => [...prev, ...data.photos]);
        }
        setHasMore((pageOffset + 1) * LIMIT < data.total);
        setPage(pageOffset);
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

  const filteredImages =
    filter === "semua"
      ? allImages
      : allImages.filter(
          (img) => img.category.name.toLowerCase() === filter.toLowerCase()
        );

  // bagi hasil filter jadi 3 kolom
  const columns = splitIntoColumns(filteredImages, 3);

  return (
    <>
      <div className="h-full ">
        <section
          className="relative h-screen flex items-center justify-center bg-cover bg-center bg-[url('/images/background-mobile.jpg')] 
             md:bg-[url('/images/background-desktop.jpg')]">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 text-center text-white px-6">
            <h1 className="text-5xl font-bold mb-4">Roganda Photo</h1>
            <p className="text-xl mb-6">
              Mengabadikan setiap momen berharga Anda
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="#porfolio-section"
                className="px-6 py-3 bg-red-600 rounded-xl font-semibold shadow-lg hover:scale-105 active:scale-100 transition">
                Hasil foto
              </a>
              <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-3 bg-green-600 rounded-xl font-semibold shadow-lg hover:scale-105 active:scale-100 transition">
                Hubungi Kami
              </button>
            </div>
          </div>
          {/* Background overlay */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              {/* Modal box */}
              <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Hubungi kami
                </h2>
                <p className="text-gray-600 mb-6 text-center">
                  Tanyakan terlebih dahulu untuk ketersediaan waktu dan tempat
                  pelaksanaan acara
                </p>

                <div className="grid">
                  <a
                    href="https://wa.me/628153857185"
                    className="px-4 py-2 text-center bg-green-600 text-white rounded-lg hover:bg-green-700">
                    WhatsApp 📩
                  </a>
                </div>

                {/* Tombol X di pojok kanan */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>
            </div>
          )}
        </section>
        <section className="min-h-screen" id="porfolio-section">
          <Filter
            setFilter={setFilter}
            filter={filter}
            categories={categories}
          />
          <div className="grid mx-7 my-10 gap-7 xl:grid-cols-3 xl:mx-40 xl:my-10 xl:gap-10">
            {columns.map((column, index) => (
              <div key={index}>
                <FotoCard
                  imagesData={column}
                  onSelectedImage={setSelectedImages}
                />
              </div>
            ))}
          </div>
          {/* tombol load more */}
          {hasMore && (
            <div className="flex justify-center mb-10 xl:mx-40 mx-7">
              <button
                onClick={() =>
                  fetchPhotos(filter === "semua" ? "all" : filter, page + 1)
                }
                disabled={loading}
                className="w-full px-6 py-4 border-green-600 border hover:bg-green-600 hover:text-white rounded-lg shadow-lg hover:scale-103 active:scale-100 transition disabled:opacity-50">
                {loading ? "Memuat..." : "Muat Lebih Banyak"}
              </button>
            </div>
          )}
          {selectedImage && (
            <ModalImage
              src={selectedImage}
              onClose={() => setSelectedImages(null)}
            />
          )}
        </section>
      </div>
    </>
  );
}

function FotoCard({ imagesData, onSelectedImage }) {
  return (
    <>
      <div className="grid gap-7 xl:gap-10">
        {imagesData.map((image) => (
          <Image
            src={image.filePath}
            alt="hasilFoto"
            key={image.id}
            className={`shadow-xl rounded-xl cursor-pointer hover:scale-103 transition`}
            onClick={() => onSelectedImage(image.filePath)}
            height={400}
            width={600}
          />
        ))}
      </div>
    </>
  );
}

function ModalImage({ src, onClose }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
        onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()} className="relative">
          <img
            src={src}
            className="xl:w-auto xl:h-[50rem] object-contain rounded-xl"
          />
          <div className="text-center">
            <button
              className="absolute rounded-full bg-gray-100 text-2xl bottom-4 hover:bg-gray-400 hover:cursor-pointer"
              onClick={onClose}>
              <img src="images/cross.png" className="w-[40px] h[40px]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ButtonFilter({ text, onClick, isActive }) {
  return (
    <>
      <button
        onClick={onClick}
        className={`text-white font-bold xl:text-xl xl:px-4 xl:py-2 xl:rounded-xl px-4 py-3 rounded-xl whitespace-nowrap hover:scale-105 active:scale-100 transition ${
          isActive ? "bg-green-400 shadow-lg" : "bg-green-600"
        }`}>
        {text}
      </button>
    </>
  );
}

function Filter({ setFilter, filter, categories }) {
  return (
    <>
      <div className="mx-7 flex flex-wrap justify-evenly gap-y-3 pt-7">
        <ButtonFilter
          text={"Semua"}
          isActive={filter === "semua"}
          onClick={() => setFilter("semua")}
        />
        {categories.map((category) => (
          <ButtonFilter
            key={category.id}
            text={category.name}
            isActive={filter === category.name}
            onClick={() => setFilter(category.name)}
          />
        ))}
      </div>
    </>
  );
}

function splitIntoColumns(array, numCols) {
  const cols = Array.from({ length: numCols }, () => []);
  array.forEach((item, index) => {
    cols[index % numCols].push(item);
  });
  return cols;
}
