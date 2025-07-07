import Link from "next/link";

export default function Home() {
  return (
    <main>

      <Header />
      <Main />
    </main>
  );
}

function Header() {
  return (
    <header className="flex justify-around items-center h-20 bg-white">
      <Button text="Utama" href="#" />
      <Button text="Tentang" href="#" />
      <Button text="List paket" href="#" />
      <Button text="Kontak" href="#" />
      <Button text="Hasil foto" href="#" />
      <p className="text-4xl text-center text-green-500 text-shadow-xs" style={{ fontFamily: 'Poppins-SemiBold', fontVariationSettings: 'wght 100' }}>Roganda Photo</p>
    </header>
  )
}

function Button({ text, href }) {
  return (
    <Link className="text-xl text-gray-500 underline text-shadow-lg hover:text-green-400 hover:text-shadow-2xs hover:scale-105 active:scale-100 transition" href={href}>{text}</Link>
  )
}

function Main() {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        {/* Gambar background (harus absolute & -z-10 agar di belakang konten) */}
        <img
          src="/image/background.jpg"
          alt="Background"
          className="absolute inset-0 object-cover w-full h-screen -z-10 opacity-40"
        />
        <p className="text-2xl" style={{ fontFamily: 'Poppins-Bold', fontVariationSettings: 'wght 100' }}>Lebih dari sekedar foto</p>
      </div>
    </>
  )
}