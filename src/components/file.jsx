import React from "react";
import { FaArrowRight } from "react-icons/fa6";

export default function File({ name, category, link }) {
    return (
        <div className="flex justify-between items-center gap-2 bg-white w-full p-2 h-20 rounded-xl shadow hover:shadow-md">
            <div className="flex gap-2 items-center">
                <img src="https://picsum.photos/100/100" alt={name} className="w-16 h-full rounded-lg" />
                <div className="">
                    <p className="text-xs text-gray-500">{category}</p>
                    <h2 className="text-md text-gray-800 font-semibold">{name}</h2>
                </div>
            </div>
            <div className="w-16 h-full flex justify-center cursor-pointer hover:shadow-md rounded-lg items-center" onClick={() => window.open(link, "_blank")}>
                <FaArrowRight size={24} />
            </div>
            {/* <FaFileAlt className="text-blue-600 hover:underline text-sm" /> */}
        </div>
    );
}
