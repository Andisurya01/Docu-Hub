import React from "react";
import { FaArrowRight } from "react-icons/fa6";

export default function File({ name, category }) {
    return (
        <div className="flex justify-between items-center gap-2 bg-white w-[100%] p-2 h-20 rounded-xl shadow hover:shadow-md transition">
            <div className="flex gap-2 items-center">
                <img src="https://picsum.photos/100/100" alt={name} className="w-16 h-full rounded-lg" />
                <div className="">
                    <p className="text-sm text-gray-500">Kategori: {category}</p>
                    <h2 className="text-lg font-semibold">{name}</h2>
                </div>
            </div>
            <div className="w-16 flex justify-center items-center">
                <FaArrowRight size={24} />
            </div>
            {/* <FaFileAlt className="text-blue-600 hover:underline text-sm" /> */}
        </div>
    );
}
