"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { portfolioImages } from "./portfolioImages";
import me from "@/public/images/wandeling-4.webp";
import contact from "@/public/images/midzomer-99.webp";
import CoffeeIcon from "@/public/coffee.svg";
import PawIcon from "@/public/paw.svg";

export default function Portfolio() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isUserInteracting = useRef(false);
  const userInteractionTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    // Detect user interaction
    const handleInteractionStart = () => {
      isUserInteracting.current = true;
      if (userInteractionTimeout.current) {
        clearTimeout(userInteractionTimeout.current);
      }
    };

    const handleInteractionEnd = () => {
      if (userInteractionTimeout.current) {
        clearTimeout(userInteractionTimeout.current);
      }
      userInteractionTimeout.current = setTimeout(() => {
        isUserInteracting.current = false;
        scrollPosition = scrollContainer?.scrollLeft || scrollPosition;
      }, 1000);
    };

    // Listen for various interaction events
    scrollContainer.addEventListener('mousedown', handleInteractionStart);
    scrollContainer.addEventListener('touchstart', handleInteractionStart);
    scrollContainer.addEventListener('wheel', handleInteractionStart);
    scrollContainer.addEventListener('mouseup', handleInteractionEnd);
    scrollContainer.addEventListener('touchend', handleInteractionEnd);
    scrollContainer.addEventListener('wheel', handleInteractionEnd);

    const scroll = () => {
      if (!scrollContainer) return;

      // Only auto-scroll when user is not interacting
      if (!isUserInteracting.current) {
        scrollPosition += scrollSpeed;

        // Reset scroll when we've scrolled through one set of images
        const maxScroll = scrollContainer.scrollWidth / 2;
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }

        scrollContainer.scrollLeft = scrollPosition;
      }

      requestAnimationFrame(scroll);
    };

    const animationFrame = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrame);
      scrollContainer.removeEventListener('mousedown', handleInteractionStart);
      scrollContainer.removeEventListener('touchstart', handleInteractionStart);
      scrollContainer.removeEventListener('wheel', handleInteractionStart);
      scrollContainer.removeEventListener('mouseup', handleInteractionEnd);
      scrollContainer.removeEventListener('touchend', handleInteractionEnd);
      if (userInteractionTimeout.current) {
        clearTimeout(userInteractionTimeout.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-6 md:p-8">
        <div className="flex justify-start items-center">
          <PawIcon className="w-16 opacity-20 active:opacity-10 transition-opacity fill-current text-foreground" />
        </div>
        <nav className="flex gap-6 font-tinos text-lg tracking-wider justify-end">
          <Link href="#works" className="hover:opacity-70 transition-opacity">
            Works
          </Link>
          <Link href="#info" className="hover:opacity-70 transition-opacity">
            Info
          </Link>
          <Link href="#contact" className="hover:opacity-70 transition-opacity">
            Contact
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-6 md:px-8 mt-12 mb-24">
        <h1 className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-[800] leading-none tracking-tight text-left break-words">
          JOENNE
          <br />
          SPREUWERS
        </h1>
        <br />
        <h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-[800] leading-none tracking-tight text-right break-words">
          CINEMATOGRAPHER
          <br />
          PHOTOGRAPHER
        </h2>
      </section>

      {/* Photo Slider */}
      <section id="works" className="px-6 md:px-8">
        <div ref={scrollRef} className="relative overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-4">
            {/* Duplicate images for seamless loop */}
            {[...portfolioImages, ...portfolioImages].map((image, index) => {
              const originalIndex = index % portfolioImages.length;
              return (
                <div
                  key={index}
                  className="relative group flex-shrink-0 overflow-hidden cursor-pointer rounded-lg h-[300px] w-[300px] md:h-[500px] md:w-[500px]"
                  onClick={() => setSelectedImage(originalIndex)}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    priority={index < 2}
                    loading={index < 2 ? "eager" : "lazy"}
                    fill
                    sizes="(max-width: 768px) 300px, 500px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-500 flex items-center justify-center rounded-lg">
                    <p className="text-white tracking-wider text-sm text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-tinos md:text-4xl">
                      {image.alt}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Whoami */}
      <section
        id="info"
        className="px-6 mt-24 flex flex-col md:flex-row gap-6 md:px-8"
      >
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight text-left break-words">
            ABOUT
            <br />
            ME
          </h2>
          <p className="mt-6 text-lg md:text-xl lg:text-2xl font-tinos">
            You just saw some of my work, what&apos;d you think about it?
          </p>
          <p className="mt-6 text-lg md:text-xl lg:text-2xl font-tinos text-justify">
            So, a bit about myself: My name is Joenne ([ˈjunə]), a 19yo
            Engineering student that has too much fun using camera&apos;s. From a
            young age I was playing around with an old DSLR, and it kinda stuck.
            Years later, next to studying I&apos;m a self-employed freelance
            cinematographer and photographer that likes to capture moments. In
            2023 I started my own company, studio3000, with the goal of telling
            stories by means of video.
          </p>
          <p className="mt-6 text-lg md:text-xl lg:text-2xl font-tinos">
            Interested in working together? Feel free to reach out!
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end items-start">
          <div className="relative w-full max-w-md md:max-w-lg aspect-[3/4]">
            <Image
              src={me}
              alt="Portrait of Joenne Spreuwers"
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-lg"
              quality={85}
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="px-6 mt-24 flex flex-col md:flex-row gap-6 md:px-8"
      >
        <div className="md:w-1/2 flex justify-center md:justify-start items-start order-2 md:order-1">
          <div className="relative w-full max-w-md md:max-w-lg aspect-[3/4]">
            <Image
              src={contact}
              alt="Portrait of Joenne Spreuwers outdoors"
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-lg"
              quality={85}
            />
          </div>
        </div>
        <div className="md:w-1/2 order-1 md:order-2">
          <h2 className="text-4xl text-right md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight break-words">
            CONTACT
            <br />
            ME
          </h2>
          <div className="flex mt-12 flex-col items-end gap-2">
            {/* Call */}
            <a
              className="text-lg md:text-xl lg:text-2xl font-tinos underline text-right hover:opacity-70 transition-opacity break-all"
              href="tel:+32472777261"
            >
              +32 472 77 72 61
            </a>
            {/* Mail */}
            <a
              className="text-lg md:text-xl lg:text-2xl font-tinos underline text-right hover:opacity-70 transition-opacity break-all"
              href="mailto:spreuwersjoenne@gmail.com"
            >
              spreuwersjoenne@gmail.com
            </a>
            <br />
            {/* LinkedIn / Instagram */}
            <a
              className="text-lg md:text-xl lg:text-2xl font-tinos underline text-right hover:opacity-70 transition-opacity"
              href="https://www.linkedin.com/in/joennespreuwers/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="text-lg md:text-xl lg:text-2xl font-tinos underline text-right hover:opacity-70 transition-opacity"
              href="https://www.instagram.com/joennespreuwers_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="h-16 mt-16 flex items-center justify-center">
        Made with (too much) caffeine{" "}
        <CoffeeIcon className="inline-block w-6 h-6 ml-1 mb-1 fill-current text-foreground" />
      </div>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:opacity-70 transition-opacity z-10"
            onClick={() => setSelectedImage(null)}
            aria-label="Close modal"
          >
            ×
          </button>
          <div className="relative w-full flex-1 max-w-7xl flex items-center justify-center">
            <Image
              src={portfolioImages[selectedImage].src}
              alt={portfolioImages[selectedImage].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <div className="w-full text-center pt-8 pb-8">
            <p className="text-white text-xl md:text-3xl font-tinos">
              {portfolioImages[selectedImage].alt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
