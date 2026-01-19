import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { fetchHero, createHero, updateHero } from '../api/heroService';


const IMAGE_BASE_URL = `${import.meta.env.VITE_API_URL}/images/`;

export default function HeroFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();


    const [form, setForm] = useState({
        nickname: '',
        real_name: '',
        origin_description: '',
        superpowers: '',
        catch_phrase: ''
    });

    const [existingImages, setExistingImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        if (!id) return;

        let isMounted = true;
        const loadHero = async () => {
            try {
                setLoading(true);
                const res = await fetchHero(id);
                if (isMounted && res.data) {
                    const { nickname, real_name, origin_description, superpowers, catch_phrase, images } = res.data;

                    setForm({ nickname, real_name, origin_description, superpowers, catch_phrase });
                    setExistingImages(images || []);
                }
            } catch (err) {
                console.error("Failed to fetch hero:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadHero();
        return () => { isMounted = false; };
    }, [id]);


    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const removeExistingImage = (imgName) => {
        setExistingImages(prev => prev.filter(img => img !== imgName));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            const formData = new FormData();


            Object.entries(form).forEach(([key, value]) => {
                formData.append(key, value || '');
            });


            files.forEach(file => formData.append('images', file));


            formData.append('existingImages', JSON.stringify(existingImages));

            if (id) {
                await updateHero(id, formData);
            } else {
                await createHero(formData);
            }

            navigate('/');

        } catch (err) {
            console.error("Error saving hero:", err);
            alert("Failed to save superhero. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="p-20 text-center font-bold">Loading Hero Data...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl space-y-4 mb-10">

            <h2 className="text-2xl font-bold mb-4">
                {id ? 'Edit Hero' : 'Create New Hero'}
                </h2>

            <input
                name="nickname"
                className="w-full border p-3 rounded focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Nickname"
                value={form.nickname}
                onChange={handleChange}
                required/>

            <input
                name="real_name"
                className="w-full border p-3 rounded focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Real Name"
                value={form.real_name}
                onChange={handleChange}
                required/>

            <textarea
                name="origin_description"
                className="w-full border p-3 rounded focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Origin Description"
                rows="3"
                value={form.origin_description}
                onChange={handleChange}/>

            <textarea
                name="superpowers"
                className="w-full border p-3 rounded focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Superpowers"
                rows="2"
                value={form.superpowers}
                onChange={handleChange}/>

            <input
                name="catch_phrase"
                className="w-full border p-3 rounded focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Catch Phrase"
                value={form.catch_phrase}
                onChange={handleChange}/>


            {existingImages.length > 0 && (
                <div className="flex gap-2 flex-wrap pt-2">
                    {existingImages.map(img => (
                        <div key={img} className="relative group">

                            <img
                                src={`${IMAGE_BASE_URL}${img}`}
                                alt="Hero preview"
                                className="w-20 h-20 object-cover rounded border"/>

                            <button
                                type="button"
                                onClick={() => removeExistingImage(img)}
                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-700 transition shadow-sm">

                                ✕

                            </button>

                        </div>
                    ))}
                </div>
            )}


            <div className="border-2 border-dashed border-gray-300 p-4 text-center rounded-lg hover:bg-gray-50 transition">

                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="w-full cursor-pointer"
                    accept="image/*"/>

                {files.length > 0 && (
                    <p className="mt-2 text-sm text-gray-600">{files.length} new file(s) selected</p>
                )}

            </div>

            <button

                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
                {isSubmitting ? 'Saving...' : 'Save Superhero'}

            </button>
        </form>
    );
}