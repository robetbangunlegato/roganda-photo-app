'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
    return (
        <header className="flex justify-around items-center h-20 shadow-md">
            <Button text="Utama" href="/" />
            <Button text="Tentang" href="/tentang" />
            <Button text="List paket" href="/listpaket" />
            <Button text="Kontak" href="/kontak" />
            <Button text="Hasil foto" href="/hasilfoto" />
            <p className="text-4xl text-center text-green-500 text-shadow-xs" style={{ fontFamily: 'Poppins-SemiBold', fontVariationSettings: 'wght 100' }}>Roganda Studio</p>
        </header>
    )
}

function Button({ text, href }) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link className={`text-xl text-gray-500 underline text-shadow-lg hover:text-green-500 hover:text-shadow-2xs hover:scale-105 active:scale-100 transition ${isActive ? 'text-green-500 scale-105' : ''}`} href={href}>{text}</Link>
    )
}