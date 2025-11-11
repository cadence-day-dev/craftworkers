"use client";

import { useState } from "react";
import Container from "./container";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function MoreProjectsModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
      ></div>
      
      {/* Modal content */}
      <div className="relative bg-white w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <Container>
          <div className="py-8">
            
            {/* Modal content */}
            <div className="max-w-xl mx-auto">
              <h2 className="text-lg tracking-wider leading-tight mb-8 text-left font-normal">
                Thank you for your interest.
              </h2>
              
              <div className="text-lg leading-relaxed mb-8">
                <p className="mb-6">
                  We would love to show you more of our work.
                </p>
                
                <p className="mb-8">
                  Please contact us to discuss your project and see additional examples of our portfolio.
                </p>
              </div>
              
              {/* Contact information */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-md font-normal uppercase tracking-wider mb-4">
                  Contact
                </h3>
                
                <div className="text-lg leading-relaxed space-y-2">
                  <p>
                    <a href="mailto:hello@futurethreads.xyz" className="hover:underline">
                      hello@futurethreads.xyz
                    </a>
                  </p>
                  <p>
                    <a href="tel:+442071234567" className="hover:underline">
                      +44 20 7123 4567
                    </a>
                  </p>
                  <p className="mt-4">
                    Caledonia Street, London
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}