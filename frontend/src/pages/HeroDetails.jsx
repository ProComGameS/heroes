import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { fetchHero, deleteHero } from '../api/heroService';


const IMG_PATH = `${import.meta.env.VITE_API_URL}/images/`;

export default function HeroDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function loadHero() {
            try {
                setLoading(true);
                const res = await fetchHero(id);
                if (isMounted) {
                    setHero(res.data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError("Failed to load the hero details.");
                    console.error("Fetch error:", err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadHero();

        return () => {
            isMounted = false;
        };
    }, [id]);

    const confirmDelete = async () => {
        if (!window.confirm("Are you sure you want to remove this legend?")) return;

        try {
            await deleteHero(id);
                navigate('/');
        } catch (err) {
            alert("Failed to delete hero. Please try again.");
            console.error("Delete error:", err);
        }
    };

    if (loading) {
        return (

                    <div className="p-20 text-xl animate-pulse text-center text-slate-600">
                            Loading hero details...
                    </div>
        );
    }

    if (error || !hero) {
        return (
            <div className="p-20 text-center">

                <p className="text-red-500 font-bold mb-4">{error || "Hero not found"}</p>
                <Link to="/" className="text-slate-800 underline">Back to list</Link>

            </div>
        );
    }

    return (
        <div className="max-w-4xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden mb-10">

            <div className="p-8">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">

                    <h1 className="text-5xl font-black text-slate-800 uppercase tracking-tighter">
                        {hero.nickname}
                    </h1>

                    <div className="flex space-x-4">

                        <Link
                            to={`/heroes/edit/${id}`}
                            className="bg-amber-500 text-white px-6 py-2 rounded-full font-bold hover:bg-amber-600 transition">
                            Edit
                        </Link>

                        <button

                            onClick={confirmDelete}
                            className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition">
                            Delete

                        </button>

                    </div>
                </div>

                <h3 className="text-xl text-gray-500 mb-6 italic">
                    Identified as: {hero.real_name}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>

                        <h4 className="font-bold border-b pb-2 mb-2">Origin</h4>

                        <p className="text-gray-700 leading-relaxed">
                            {hero.origin_description}
                        </p>

                    </div>
                    <div>

                        <h4 className="font-bold border-b pb-2 mb-2">Superpowers</h4>

                        <p className="text-gray-700 leading-relaxed">
                            {hero.superpowers}
                        </p>

                    </div>
                </div>

                <div className="mt-8 p-6 bg-slate-100 rounded-xl border-l-8 border-slate-800">

                    <p className="text-2xl font-serif italic text-slate-700">
                        "{hero.catch_phrase}"
                    </p>

                </div>

                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {hero.images?.map((img) => (
                        <img key={img}
                            src={`${IMG_PATH}${img}`}
                            alt={`${hero.nickname} gallery`}
                            className="w-full h-64 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"/>
                    ))}
                </div>
            </div>
        </div>
    );
}