"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
}

export default function GalleryModal({
  isOpen,
  onClose,
  imageUrl,
  alt,
}: GalleryModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              className="relative max-w-7xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute -top-12 right-0 text-white hover:text-slate-300 transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Image */}
              <div className="relative w-full h-full rounded-lg overflow-hidden bg-slate-800 flex items-center justify-center min-h-[400px]">
                {imageUrl.startsWith("/api/placeholder") ? (
                  <div className="text-center p-8">
                    <p className="text-slate-400 text-lg mb-2">Project Preview</p>
                    <p className="text-slate-500 text-sm">{alt}</p>
                    <p className="text-slate-600 text-xs mt-4">Replace with your project screenshot</p>
                  </div>
                ) : (
                  <img
                    src={imageUrl}
                    alt={alt}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

