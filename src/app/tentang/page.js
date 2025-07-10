import Header from "../components/header";

export default function Tentang() {
    return (
        <>
            <Header />
            <h1 className="text-6xl" style={{ fontFamily: 'Poppins-Regular' }}>Halaman tentang</h1>
            <div className="bg-red-500 text-white p-4 animate-fade-in">
                Ini harus muncul dengan animasi fade-in
            </div>

        </>
    )
}