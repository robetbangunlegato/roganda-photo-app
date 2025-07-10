'use client';
import { useState } from "react";
import Header from "../components/header";

const imagesData =
    [
        [
            {
                id: 1,
                src: 'images/image-1.jpg'
            },
            {
                id: 2,
                src: 'images/image-2.jpg'
            }
        ],
        [

            {
                id: 1,
                src: 'images/image-2.jpg'
            },
            {
                id: 2,
                src: 'images/image-1.jpg'
            }
        ],
        [
            {
                id: 1,
                src: 'images/image-1.jpg'
            },
            {
                id: 2,
                src: 'images/image-2.jpg'
            }
        ]

    ]


export default function App() {
    const [selectedImage, setSelectedImages] = useState(null);
    return (
        <>
            <Header />
            <div className="grid grid-cols-3 mx-40">
                {imagesData.map((column, index) => (
                    <div key={index}>
                        <FotoCard imagesData={column} onSelectedImage={setSelectedImages} />
                    </div>
                ))}
            </div>
            {selectedImage && (
                <ModalImage src={selectedImage} onClose={() => setSelectedImages(null)} />
            )}
        </>
    )
}

function FotoCard({ imagesData, onSelectedImage }) {
    return (
        <>
            <div className={`grid gap-7 p-5`}>
                {imagesData.map((image) => (
                    <img src={image.src} key={image.id} className={`shadow-2xl rounded-xl cursor-pointer hover:scale-103 transition`} onClick={() => onSelectedImage(image.src)} />
                ))}
            </div >
        </>
    )
}

function ModalImage({ src, onClose }) {
    return (
        <>
            <div
                className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center animate-fade-in"
                onClick={onClose}
            >
                <div onClick={(e) => e.stopPropagation()}>
                    <img src={src} className="w-auto max-h-[90vh] object-contain" />
                </div>
            </div>
        </>

    )
}

