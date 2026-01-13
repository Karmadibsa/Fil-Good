import React, { useState, useEffect, useCallback } from 'react';
import { Image as ImageIcon, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

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

        // Ensure stable order by sorting by path or name if needed, assuming default glob order is fine but unstable across systems sometimes.
        // Let's sort to be consistent.
        imageList.sort((a, b) => a.name.localeCompare(b.name));

        setImages(imageList);
    }, []);

    const handleNext = useCallback((e) => {
        e?.stopPropagation();
        if (!selectedImage) return;
        const currentIndex = images.findIndex(img => img.path === selectedImage.path);
        const nextIndex = (currentIndex + 1) % images.length;
        setSelectedImage(images[nextIndex]);
    }, [selectedImage, images]);

    const handlePrev = useCallback((e) => {
        e?.stopPropagation();
        if (!selectedImage) return;
        const currentIndex = images.findIndex(img => img.path === selectedImage.path);
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setSelectedImage(images[prevIndex]);
    }, [selectedImage, images]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') setSelectedImage(null);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, handleNext, handlePrev]);

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
                        key={img.path}
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                    {/* Close Button */}
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 z-50 p-3 bg-black/50 hover:bg-white/20 text-white rounded-full transition-colors"
                        title="Fermer (Échap)"
                    >
                        <X size={24} />
                    </button>

                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 z-50 p-3 bg-black/50 hover:bg-white/20 text-white rounded-full transition-colors hidden md:block"
                        title="Image précédente (Flèche gauche)"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-4 z-50 p-3 bg-black/50 hover:bg-white/20 text-white rounded-full transition-colors hidden md:block"
                        title="Image suivante (Flèche droite)"
                    >
                        <ChevronRight size={32} />
                    </button>

                    {/* Image Container */}
                    <div
                        className="relative w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Mobile Navigation Areas - invisible clickable zones */}
                        <div className="absolute left-0 top-0 bottom-0 w-1/4 z-10 md:hidden" onClick={handlePrev}></div>
                        <div className="absolute right-0 top-0 bottom-0 w-1/4 z-10 md:hidden" onClick={handleNext}></div>

                        <img
                            src={selectedImage.src}
                            alt={selectedImage.name}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl select-none"
                        />

                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white text-sm rounded-full backdrop-blur-md">
                            {images.findIndex(img => img.path === selectedImage.path) + 1} / {images.length}
                        </div>
                    </div>

                    {/* Backdrop click to close */}
                    <div className="absolute inset-0 -z-10" onClick={() => setSelectedImage(null)}></div>
                </div>
            )}
        </div>
    );
}
