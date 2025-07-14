'use client';
import { useState } from "react";
import Header from "../components/header";
import Image from 'next/image'

const imagesData =
    [
        [
            {
                id: 1,
                src: '/images/image-1.jpg',
                tag: "pernikahaan"
            },
            {
                id: 2,
                src: '/images/image-2.jpg',
                tag: "monding"
            }
        ],
        [
            {
                id: 1,
                src: '/images/image-2.jpg',
                tag: "aqiqah"
            },
            {
                id: 2,
                src: '/images/image-1.jpg',
                tag: "ulang tahun"
            }
        ],
        [
            {
                id: 1,
                src: '/images/image-1.jpg',
                tag: 'pernikahaan'
            },
            {
                id: 2,
                src: '/images/image-2.jpg',
                tag: 'monding'
            }
        ]

    ]


export default function App() {
    const [selectedImage, setSelectedImages] = useState(null);
    return (
        <>
            <div className="fixed top-0 w-full bg-white z-40">
                <Header />
            </div>
            <div className="pt-[7rem]">
                <Filter />
                <div className="grid my-7 mx-7 gap-7 xl:grid-cols-3 xl:mx-40 xl:my-10 xl:gap-10">
                    {imagesData.map((column, index) => (
                        <div key={index}>
                            <FotoCard imagesData={column} onSelectedImage={setSelectedImages} />
                        </div>
                    ))}
                </div>
                {selectedImage && (
                    <ModalImage src={selectedImage} onClose={() => setSelectedImages(null)} />
                )}
            </div>
        </>
    )
}

function Filter() {
    return <>
        <div className="flex mx-7 gap-4 bg-gray-100 py-2 px-2 overflow-scroll scrollbar-none rounded-xl shadow-md xl:shadow-none xl:mx-40 xl:bg-transparent xl:py-0 xl:px-0 xl:overflow-auto justify-around">
            <ButtonFilter text={'Semua'} />
            <ButtonFilter text={'Pernikahaan'} />
            <ButtonFilter text={'Aqiqah'} />
            <ButtonFilter text={'Monding'} />
            <ButtonFilter text={'Ulang tahun'} />
        </div>
    </>
}

function ButtonFilter({ text, filterContent, isActive }) {
    return <>
        <button className="bg-green-400 text-white xl:text-xl xl:px-4 xl:py-2 xl:rounded-xl px-4 py-3 rounded-xl whitespace-nowrap" style={{ fontFamily: 'Poppins-Bold' }}>{text}</button>
    </>
}

function FotoCard({ imagesData, onSelectedImage }) {
    return (
        <>
            <div className="grid gap-7 xl:gap-10">
                {imagesData.map((image) => (
                    <Image src={image.src} alt="hasilFoto" key={image.id} className={`shadow-xl rounded-xl cursor-pointer hover:scale-103 transition`} onClick={() => onSelectedImage(image.src)} height={400} width={600} />
                ))}
            </div >
        </>
    )
}

function ModalImage({ src, onClose }) {
    return (
        <>
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center" onClick={onClose}>
                <div onClick={(e) => e.stopPropagation()} className="relative">
                    <img src={src} className="xl:w-auto xl:h-[50rem] object-contain rounded-xl" />
                    <div className="text-center">
                        <button className="absolute rounded-full bg-gray-100 text-2xl bottom-4 hover:bg-gray-400 hover:cursor-pointer" onClick={onClose}><img src="images/cross.png" className="w-[40px] h[40px]" /></button>
                    </div>
                </div>
            </div>
        </>
    )
}