import { useEffect, useState } from "react";
import React from "react";
import File from "../components/file";
import Background from "../components/background";
import SearchResult from "../components/searchResults";
import { fetchSheetData } from "../utils/sheets"; // Import the fetch function

export default function Home() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const projects = await fetchSheetData();
                console.log(projects);

                const transformedData = projects.flatMap(project => 
                    project.engineering.map(eng => ({
                        id: `${project.no}-${eng.type}`,
                        title: `${project.project} - ${eng.type}`,
                        category: eng.type,
                        description: "", 
                        link: eng.link || "#"
                    }))
                );
                
                setData(transformedData);
                setError(null);
            } catch (err) {
                console.error("Failed to load data:", err);
                setError("Gagal memuat data. Silakan coba lagi nanti.");
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        loadData();

        const interval = setInterval(loadData, 300000);
        return () => clearInterval(interval);
    }, []);

    const filteredData = data
        .filter((item) => {
            if (!searchTerm) return false;
            const term = searchTerm.toLowerCase();
            return (
                item.category.toLowerCase().includes(term) ||
                item.title.toLowerCase().includes(term) ||
                (item.description && item.description.toLowerCase().includes(term)) ||
                (item.link && item.link.toLowerCase().includes(term))
            );
        })
        .slice(0, 3);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && searchTerm) {
            setOpen(true);
        }
    };

    return (
        <div className="absolute inset-0 flex justify-center items-center bg-transparent min-h-screen z-10">
            <SearchResult item={filteredData} open={open} setOpen={() => setOpen(false)} />
            <div className="max-w-5xl mx-auto">
                <h1 className="text-gray-950 text-5xl md:text-9xl font-medium text-center">Docu Hub</h1>
                <p className="text-gray-700 text-sm md:text-md text-center p-4">Silakan masukkan kata kunci pencarian.</p>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                        {error}
                    </div>
                )}
                
                {loading && (
                    <div className="text-center py-4">
                        Memuat data...
                    </div>
                )}

                <div className="flex items-stretch">
                    <input
                        type="text"
                        placeholder="Cari berdasarkan kategori, title, deskripsi, atau link..."
                        className="w-full p-3 text-sm md:text-md border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 rounded-lg ml-2 hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50"
                        onClick={() => searchTerm && setOpen(true)}
                        disabled={!searchTerm || loading}
                    >
                        Cari
                    </button>
                </div>

                {!loading && (
                    <div className="w-full relative">
                        {searchTerm && (
                            filteredData.length > 0 ? (
                                <div className="absolute top-4 grid w-full gap-4 pt-2">
                                    {filteredData.map((item) => (
                                        <File 
                                            key={item.id} 
                                            name={item.title} 
                                            category={item.category} 
                                            link={item.link} 
                                        />
                                    ))}
                                </div>
                            ) : (
                                searchTerm && <p className="text-gray-500 text-center">Tidak ada hasil ditemukan.</p>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}