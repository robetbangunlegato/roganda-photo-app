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
        {/* <ButtonFilter
          text={"Pernikahaan"}
          isActive={filter === "pernikahaan"}
          onClick={() => setFilter("pernikahaan")}
        />
        <ButtonFilter
          text={"Aqiqah"}
          isActive={filter === "aqiqah"}
          onClick={() => setFilter("aqiqah")}
        />
        <ButtonFilter
          text={"Monding(batak)"}
          isActive={filter === "monding"}
          onClick={() => setFilter("monding")}
        />
        <ButtonFilter
          text={"Ulang tahun"}
          isActive={filter === "ulang tahun"}
          onClick={() => setFilter("ulang tahun")}
        /> */}
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

function Carousel() {
  const [current, setCurrent] = useState(0);

  // Auto slide setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000); // 3000ms = 3 detik

    return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
  }, []);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-xl">
      {/* Slides */}
      <div className="h-[600px] w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}>
            <img
              src={slide.image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-[rgba(0,0,0,0.3)] text-white text-center">
              <h5 className="text-xl font-bold">{slide.title}</h5>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 z-20 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full">
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 z-20 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full">
        ›
      </button>
    </div>
  );
}
