'use client';

import Link from "next/link";

import { useEffect, useState } from "react";
import Header from "./components/header.js";

const slides = [
  {
    image: '/images/slide1.jpg',
    title: 'First slide label',
    description: 'Some representative placeholder content for the first slide.',
  },
  {
    image: '/images/slide2.jpg',
    title: 'Second slide label',
    description: 'Some representative placeholder content for the second slide.',
  },
  {
    image: '/images/slide3.jpg',
    title: 'Third slide label',
    description: 'Some representative placeholder content for the third slide.',
  },
]

export default function Home() {
  return (
    <main>
      <Header />
      <Main />
      {/* <h1 className="text-6xl">Halaman tentang</h1> */}
    </main>
  );
}



function Main() {
  return (
    <>
      <div className="">
        <img
          src="/image/background.jpg" alt="background" className="absolute object-cover -z-10 opacity-10 w-full h-[calc(100vh-5rem)]"
        />
        <div className="grid grid-cols-2 h-[calc(100vh-5rem)] justify-center items-center">
          <div className="pl-10">
            <Carousel />
          </div>
          <div className="text-center">
            <div className="grid gap-4">
              <p className="text-6xl" style={{ fontFamily: 'Poppins-Bold' }}>Lebih dari sekedar foto</p>
              <p className="text-4xl" style={{ fontFamily: 'Poppins-Bold' }}>Berpengalaman lebih dari
                <span className="relative inline-block before:absolute before:-inset-1 before:block before:bg-green-100 ml-4 ">
                  <span className="relative text-green-500">20 tahun</span>
                </span>
              </p>
              <p className="text-2xl text-gray-500" style={{ fontFamily: 'Poppins-SemiBold' }}>
                Selalu hadir dalam momen-momen penting anda.
              </p>
              <div className="flex gap-2 justify-center">
                <Link className="bg-green-500 text-white text-xl py-2 px-3 rounded-2xl hover:bg-green-400 hover:scale-105 active:bg-green-500 transition active:scale-100" href={'#'}>Booking sekarang</Link>
                <Link className="bg-green-500 text-white text-xl py-2 px-3 rounded-2xl hover:bg-green-400 hover:scale-105 active:bg-green-500 transition active:scale-100" href={'#'}>Hasil foto</Link>              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
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
      <div className="relative h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
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
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === current ? 'bg-white' : 'bg-white/50'
              }`}
          />
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 z-20 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 z-20 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
      >
        ›
      </button>
    </div>
  );
}

