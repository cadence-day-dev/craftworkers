"use client";

import { useState } from "react";
import Image from "next/image";
import { PhotoModal } from "./photo-modal";

type AccordionItem = {
  id: string;
  title: string;
  content: string;
  images?: string[];
  thumbnail?: string;
};

type Props = {
  items: AccordionItem[];
};

function OptimizedImage({ src, alt, index, onClick }: { 
  src: string; 
  alt: string; 
  index: number; 
  onClick?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div 
      className="aspect-square overflow-hidden relative bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity"
      onClick={onClick}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}
      {hasError ? (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
          Failed to load
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-opacity duration-300"
          style={{ opacity: isLoading ? 0 : 1 }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          loading={index < 4 ? "eager" : "lazy"}
          sizes="(max-width: 768px) 50vw, 25vw"
          quality={85}
        />
      )}
    </div>
  );
}

export function Accordion({ items }: Props) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [photoModal, setPhotoModal] = useState<{
    isOpen: boolean;
    imageSrc: string;
    imageAlt: string;
    images: string[];
    currentIndex: number;
  }>({
    isOpen: false,
    imageSrc: '',
    imageAlt: '',
    images: [],
    currentIndex: 0
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const openPhotoModal = (imageSrc: string, imageAlt: string, images: string[], currentIndex: number) => {
    setPhotoModal({
      isOpen: true,
      imageSrc,
      imageAlt,
      images,
      currentIndex
    });
  };

  const closePhotoModal = () => {
    setPhotoModal(prev => ({ ...prev, isOpen: false }));
  };

  const navigatePhoto = (index: number) => {
    setPhotoModal(prev => ({
      ...prev,
      currentIndex: index,
      imageSrc: prev.images[index],
      imageAlt: `Image ${index + 1}`
    }));
  };

  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <div key={item.id} className="border-b border-gray-200">
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full py-6 flex items-center justify-between text-left hover:opacity-70 transition-opacity"
          >
            <div className="flex items-center">
              {item.thumbnail && (
                <div className="w-16 h-16 mr-4 relative overflow-hidden bg-gray-100">
                  <Image
                    src={item.thumbnail}
                    alt={`${item.title} thumbnail`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              )}
              <h3 className="text-md md:text-lg font-normal uppercase tracking-wider color-black">
                {item.title}
              </h3>
            </div>
            <div className="ml-5">
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  openItems.includes(item.id) ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openItems.includes(item.id) ? 'max-h-[5000px] pb-6' : 'max-h-0'
            }`}
          >
            <div className="text-lg leading-relaxed text-gray-700 mb-2 md:mb-4">
              {item.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className={index > 0 ? 'mt-4' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>
            {item.images && item.images.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {item.images.map((image, imageIndex) => (
                  <OptimizedImage
                    key={imageIndex}
                    src={image}
                    alt={`${item.title} - Image ${imageIndex + 1}`}
                    index={imageIndex}
                    onClick={() => openPhotoModal(
                      image, 
                      `${item.title} - Image ${imageIndex + 1}`, 
                      item.images || [], 
                      imageIndex
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      
      <PhotoModal
        isOpen={photoModal.isOpen}
        onClose={closePhotoModal}
        imageSrc={photoModal.imageSrc}
        imageAlt={photoModal.imageAlt}
        images={photoModal.images}
        currentIndex={photoModal.currentIndex}
        onNavigate={navigatePhoto}
      />
    </div>
  );
}