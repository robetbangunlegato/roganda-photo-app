import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen">
      {/* Mobile Background */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/mobile-hero.jpg"
          alt="Roganda Photo Mobile"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Desktop Background */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/images/desktop-hero.jpg"
          alt="Roganda Photo Desktop"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay (gelap transparan biar teks lebih terbaca) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Konten */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold">Roganda Photo</h1>
        <p className="mt-4 text-lg md:text-2xl">
          Jasa Fotografi Profesional untuk Momen Berharga Anda
        </p>
      </div>
    </section>
  );
}
