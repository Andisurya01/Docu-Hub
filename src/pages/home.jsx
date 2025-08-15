import { useEffect, useState } from "react";
import React from "react";
import File from "../components/file";
import Background from "../components/background";
import SearchResult from "../components/searchResults";
export default function Home() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch("/data/data.json")
            .then((res) => res.json())
            .then((json) => {
                const merged = Object.entries(json).flatMap(([category, items]) =>
                    items.map((item) => ({ ...item, category }))
                );
                setData(merged);
            });
    }, []);

    const filteredData = data.filter((item) => {
        const term = searchTerm.toLowerCase();
        return (
            item.category.toLowerCase().includes(term) ||
            item.title.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term) ||
            item.link.toLowerCase().includes(term)
        );
    });

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (searchTerm === "") {
                return;
            }
            setOpen(true);
            console.log(open);
        }
        // Handle form submission
    };

    return (
        <div className="absolute inset-0 flex justify-center items-center bg-transparent min-h-screen z-10">
            <SearchResult item={filteredData} open={open} setOpen={() => setOpen(false)} />
            <div className="max-w-5xl mx-auto">
                <h1 className="text-gray-950 text-5xl md:text-9xl font-medium text-center">Docu Hub</h1>
                <p className="text-gray-700 text-sm md:text-md text-center p-4">Silakan masukkan kata kunci pencarian.</p>
                <input
                    type="text"
                    placeholder="Cari berdasarkan kategori, title, deskripsi, atau link..."
                    className="w-full p-3 text-sm md:text-md border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}

                />
                {
                    searchTerm === "" ? null :
                        filteredData.length > 0 ? (
                            <div className="absolute grid gap-4">
                                {filteredData.map((item) => (
                                    <File key={item.id} name={item.title} category={item.category} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center">Tidak ada hasil ditemukan.</p>
                        )

                }
            </div>
        </div>
    );
}
