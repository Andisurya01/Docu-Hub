import React, { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";

export default function SearchResult({ item, open, setOpen }) {
    console.log(item);
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [setOpen]);

    return (
        <div className={`absolute z-10 bg-white ${open ? "" : "translate-y-[100%]"} h-[90%] w-[95%] bottom-0 rounded-r-lg shadow hover:shadow-md transition duration-500 p-6 `}>
            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-semibold">Hasil Pencarian</h2>
                <FaXmark size={24} onClick={setOpen} color="gray" />
            </div>
            <div className="overflow-y-auto h-full">
                {
                    item.length > 0 ? (
                        item.map((result) => (
                            <div key={result.id} className="border-b border-gray-200 py-2">
                                <p className="text-sm text-gray-500">{result.category}</p>
                                <h2 className="text-lg font-semibold">{result.title}</h2>
                                <p className="text-gray-600">{result.description}</p>
                                <a
                                    href={result.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline text-sm"
                                >
                                    {result.link}
                                </a>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Tidak ada hasil ditemukan.</p>
                    )
                }
            </div>
        </div>
    );
}
