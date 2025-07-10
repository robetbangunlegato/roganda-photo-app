import Header from "../components/header";

export default function listPaket() {
    return (
        <>
            <Header />
            <div className=" grid grid-cols-3 mx-40 p-10 gap-7">
                <Card title={'Pernikahaan'} price={'Rp2.500.000 - 3.000.000'} detail={'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor perspiciatis dolore nemo reiciendis tempora voluptatibus esse ratione, molestias, ullam corporis nobis impedit earum ut tempore fuga tenetur veniam nesciunt nihil!'} />
                <Card title={'Aqiqah'} price={'Rp2.500.000 - 3.000.000'} detail={'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor perspiciatis dolore nemo reiciendis tempora voluptatibus esse ratione, molestias, ullam corporis nobis impedit earum ut tempore fuga tenetur veniam nesciunt nihil!'} />
                <Card title={'Meninggal (batak)'} price={'Rp2.500.000 - 3.000.000'} detail={'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor perspiciatis dolore nemo reiciendis tempora voluptatibus esse ratione, molestias, ullam corporis nobis impedit earum ut tempore fuga tenetur veniam nesciunt nihil!'} />
                <Card title={'Ulang Tahun'} price={'Rp2.500.000 - 3.000.000'} detail={'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor perspiciatis dolore nemo reiciendis tempora voluptatibus esse ratione, molestias, ullam corporis nobis impedit earum ut tempore fuga tenetur veniam nesciunt nihil!'} />
            </div>

        </>
    )
}

function Card({ title, detail, price }) {
    return (
        <>
            <div className="flex shadow-xl rounded-xl">
                <div className="rounded-xl border-gray-200 border-2">
                    <div className="m-3.5">
                        <img src="images/background.jpg" className="rounded-tl-xl rounded-tr-xl" />
                    </div>
                    <div className="m-6">
                        <p className="text-xl font-bold" style={{ fontFamily: 'Poppins-SemiBold' }}>{title}</p>
                        <label className="text-gray-500 text-md" style={{ fontFamily: 'Poppins-Regular' }}>{price}</label>
                        <p className="text-justify mt-2 font-extralight" style={{ fontFamily: 'Poppins-Regular' }}>{detail}</p>
                    </div>
                    <div className="m-6">
                        <button className={`bg-green-500 text-white text-xl py-2 px-3 rounded-2xl hover:bg-green-400 hover:scale-105 active:bg-green-500 transition active:scale-100 w-full`}>Booking</button>
                    </div>
                </div>
            </div>
        </>
    )
}