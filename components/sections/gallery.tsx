"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import GalleryModal from "@/components/gallery/gallery-modal";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "SaaS Landing Page",
    image: "/showcase/saas-screenshot.svg",
    link: "/showcase/saas",
    description: "Dark mode, Neon Blue, Glassmorphism"
  },
  {
    id: 2,
    title: "Dentist Landing Page",
    image: "/showcase/dentist-screenshot.svg",
    link: "/showcase/dentist",
    description: "Light mode, Clean White & Teal"
  },
  {
    id: 3,
    title: "E-Commerce Landing Page",
    image: "/showcase/ecom-screenshot.svg",
    link: "/showcase/ecom",
    description: "Vibrant Orange/Black, Streetwear Style"
  },
];

export default function Gallery() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);

  const handleImageClick = (image: string, title: string, link?: string) => {
    if (link) {
      router.push(link);
    } else {
      setSelectedImage({ url: image, alt: title });
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mb-16"
        >
          The Gallery
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0.9, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <Card
                variant="gallery"
                className="opacity-90 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                onClick={() => handleImageClick(project.image, project.title, project.link)}
              >
                <div className="aspect-[4/3] bg-slate-800 relative overflow-hidden">
                  {/* Screenshot Image */}
                  {/* Screenshot Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Fallback Placeholder - Note: next/image handles loading, but for 404s we might need a different strategy. 
                      For now, we trust the assets exist or use a blurDataURL if we had one. 
                      The complicated onError logic from before is hard to replicate perfectly with simple next/image usage 
                      without client state, but next/image allows onError. 
                      Let's stick to the cleaner implementation first. 
                  */}

                  {/* View Project Badge - appears on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center"
                  >
                    <span className="text-white font-semibold text-lg px-4 py-2 bg-blue-500/80 rounded-lg backdrop-blur-sm">
                      View Project
                    </span>
                  </motion.div>
                </div>
                {/* Project Title Below Image */}
                <div className="p-4">
                  <h3 className="text-white font-semibold text-lg mb-1">{project.title}</h3>
                  <p className="text-slate-400 text-sm">{project.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <GalleryModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage.url}
          alt={selectedImage.alt}
        />
      )}
    </section>
  );
}

