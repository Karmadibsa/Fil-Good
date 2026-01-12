import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, ZoomIn, X } from 'lucide-react';

export function CreationsPage() {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        // using Vite's glob import to get all images from the folder
        const modules = import.meta.glob('/src/assets/creations/*.{png,jpg,jpeg,webp,JPG,PNG}', { eager: true });

        const imageList = Object.entries(modules).map(([path, module]) => {
            return {
                path,
                src: module.default,
                name: path.split('/').pop().split('.')[0]
            };
        });

        setImages(imageList);
    }, []);

    return (
        <div className="h-full flex flex-col">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Mes Créations</h2>
                <p className="text-slate-500 font-medium">Galerie de projets réalisés.</p>
                {images.length === 0 && (
                    <div className="mt-8 p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 text-center">
                        <div className="mx-auto w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-3">
                            <ImageIcon size={24} />
                        </div>
                        <h3 className="text-slate-900 font-medium mb-1">Aucune image trouvée</h3>
                        <p className="text-slate-500 text-sm">Ajoutez vos photos dans le dossier <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-700 font-mono">src/assets/creations</code></p>
                    </div>
                )}
            </div>

            {/* Masonry-like Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pb-20">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 cursor-zoom-in"
                        onClick={() => setSelectedImage(img)}
                    >
                        <img
                            src={img.src}
                            alt={img.name}
                            className="w-full h-auto object-cover"
                            loading="lazy"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="bg-white/90 backdrop-blur text-slate-900 p-2 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                <ZoomIn size={20} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                    <div
                        className="relative max-w-full max-h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.name}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        />
                    </div>
                    {/* Backdrop click to close */}
                    <div className="absolute inset-0 -z-10" onClick={() => setSelectedImage(null)}></div>
                </div>
            )}
        </div>
    );
}
