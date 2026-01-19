import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router';
import { fetchHeroes } from '../api/heroService';


const LIMIT = 5;
const IMAGE_BASE = `${import.meta.env.VITE_API_URL}/images/`;

export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams();


    const [data, setData] = useState({ heroes: [], total: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


        const offset = Math.max(0, parseInt(searchParams.get('offset') || '0', 10) || 0);

    const startFetching = useCallback(async (ignore) => {
        setLoading(true);
        try {
            const res = await fetchHeroes(offset);
            if (!ignore) {

                setData({
                    heroes: res?.data?.heroes || [],
                    total: res?.data?.total || 0
                });
                setError(null);
            }
        } catch (err) {
            if (!ignore) {
                console.error("Fetch error:", err);
                setError("Could not load superheroes.");
            }
        } finally {
            if (!ignore) {

                setLoading(false);
            }
        }
    }, [offset]);

    useEffect(() => {
        let ignore = false;
        startFetching(ignore);
        return () => {

            ignore = true;
        };
    }, [startFetching]);

    const changePage = (move) => {
        const newOffset = offset + move;
        if (newOffset >= 0) {

            setSearchParams({ offset: newOffset.toString() });
        }
    };


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800"></div>

                <p className="mt-4 text-slate-600 font-medium">Loading Heroes...</p>

            </div>
        );
    }


    if (error) {

        return (

            <div className="text-center p-10">
                <p className="text-red-500 font-bold">{error}</p>
                <button
                    onClick={() => startFetching(false)}
                    className="mt-4 bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition">
                        Retry
                </button>
            </div>

        );
    }

    const { heroes, total } = data;

    return (

        <div className="w-full max-w-5xl px-4 pb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {heroes.length > 0 ? (
                    heroes.map((hero) => (
                        <Link
                            key={hero.id}
                            to={`/heroes/${hero.id}`}
                            className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100">
                            <div className="h-48 overflow-hidden bg-gray-200">
                                {hero.images?.length > 0 ? (
                                    <img
                                        src={`${IMAGE_BASE}${hero.images[0]}`}
                                        alt={hero.nickname}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                ) : (

                                    <div className="flex items-center justify-center h-full text-gray-400 italic">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div className="p-4 bg-white">
                                <h3 className="text-center font-bold text-slate-800 truncate">
                                    {hero.nickname}
                                </h3>
                            </div>
                        </Link>
                    ))

                ) : (

                    <div className="col-span-full text-center py-10 text-gray-500">
                        No superheroes found.
                    </div>
                )}
            </div>


            <div className="flex justify-center items-center gap-8 mt-12">
                <button
                    disabled={offset === 0}
                    onClick={() => changePage(-LIMIT)}
                    className="flex items-center gap-2 px-6 py-2 bg-slate-800 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-slate-700 transition shadow">
                     Previous
                </button>

                <div className="flex flex-col items-center">
                    <span className="text-xs uppercase text-gray-400 font-bold tracking-widest">Page</span>
                    <span className="font-black text-xl text-slate-800">
                        {Math.floor(offset / LIMIT) + 1}
                    </span>
                </div>

                <button
                    disabled={offset + LIMIT >= total}
                    onClick={() => changePage(LIMIT)}
                    className="flex items-center gap-2 px-6 py-2 bg-slate-800 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-slate-700 transition shadow">
                    Next
                </button>
            </div>
        </div>

    );
}