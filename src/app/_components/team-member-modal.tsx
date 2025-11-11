"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type TeamMember = {
  name: string;
  image: string;
  shortDescription: string;
  extendedDescription: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
};

export function TeamMemberModal({ isOpen, onClose, member }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-90" 
        onClick={onClose}
      />
      
      
      {/* Modal content */}
      <div className="relative max-w-4xl max-h-[72vh] w-full mx-4 overflow-y-auto">
        <div className="bg-white p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Image */}
            <div className="aspect-square overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <Image
                src={member.image}
                alt={member.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
                style={{ opacity: isLoading ? 0 : 1 }}
                onLoad={() => setIsLoading(false)}
                priority
                quality={95}
              />
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-normal tracking-wider uppercase">
                {member.name}
              </h2>
              
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-gray-900">
                  {member.shortDescription}
                </p>
                
                <div className="text-base leading-relaxed text-gray-700 space-y-4">
                  {member.extendedDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}