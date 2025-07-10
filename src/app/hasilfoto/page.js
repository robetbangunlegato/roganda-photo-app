import Header from "../components/header";
export default function HasilFoto() {
    return (
        <>

            <Header />
            <div className="grid grid-cols-3 mx-40">
                <div className="grid  gap-7 p-5">
                    <FotoCard src={"images/image-1.jpg"} />
                    <FotoCard src={"images/image-2.jpg"} />

                </div>
                <div className="grid  gap-7 p-5 ">
                    <FotoCard src={"images/image-2.jpg"} />
                    <FotoCard src={"images/image-1.jpg"} />
                </div>
                <div className="grid  gap-7 p-5">
                    <FotoCard src={"images/image-1.jpg"} />
                    <FotoCard src={"images/image-2.jpg"} />

                </div>
            </div>

        </>
    )
}
function FotoCard({ src }) {
    return (
        <>
            <div className={``}>
                <img src={src} className={`shadow-2xl rounded-xl cursor-pointer hover:scale-103 transition`} />
            </div >
        </>
    )
}