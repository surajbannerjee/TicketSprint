"use client";

import React, { useState, useMemo, useEffect } from "react";
import SectionHeader from "@/components/Common/SectionHeader";
import MovieCard from "@/components/Common/MovieCard";

// Swiper React components & styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Initial Movie dataset matching the provided design images
const DEFAULT_MOVIES = [
  {
    id: "dune-awakening",
    title: "Dune: Awakening",
    posterImage:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=700&auto=format&fit=crop&q=80",
    format: "IMAX",
    isNowShowing: true,
    rating: "94%",
    duration: "2h 46m",
    languages: "English • Spanish Dub",
    showtimes: "14 Showtimes Today",
    genre: "Sci-Fi",
    bookLink: "#book-seats",
    trailerLink: "#watch-trailer",
  },
  {
    id: "neon-velocity",
    title: "Neon Velocity",
    posterImage:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=700&auto=format&fit=crop&q=80",
    format: "4DX",
    isNowShowing: true,
    rating: "91%",
    duration: "2h 10m",
    languages: "Action • English",
    showtimes: "9 Showtimes Today",
    genre: "Action",
    bookLink: "#book-seats",
    trailerLink: "#watch-trailer",
  },
  {
    id: "the-midnight-symphony",
    title: "The Midnight Symphony",
    posterImage:
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=700&auto=format&fit=crop&q=80",
    format: "Dolby",
    isNowShowing: true,
    rating: "88%",
    duration: "1h 55m",
    languages: "Drama / Musical • Italian Sub",
    showtimes: "6 Showtimes Today",
    genre: "Drama",
    bookLink: "#book-seats",
    trailerLink: "#watch-trailer",
  },
  {
    id: "quantum-heist",
    title: "Quantum Heist",
    posterImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&auto=format&fit=crop&q=80",
    format: "ScreenX",
    isNowShowing: true,
    rating: "93%",
    duration: "2h 22m",
    languages: "Sci-Fi / Heist • English",
    showtimes: "11 Showtimes Today",
    genre: "Sci-Fi",
    bookLink: "#book-seats",
    trailerLink: "#watch-trailer",
  },
  {
    id: "solaris-vanguard",
    title: "Solaris: Vanguard",
    posterImage:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=700&auto=format&fit=crop&q=80",
    format: "IMAX",
    isNowShowing: true,
    rating: "95%",
    duration: "2h 30m",
    languages: "Sci-Fi • English Dub",
    showtimes: "8 Showtimes Today",
    genre: "Sci-Fi",
    bookLink: "#book-seats",
    trailerLink: "#watch-trailer",
  },
  {
    id: "tokyo-drift-zero",
    title: "Tokyo Cyber Drift",
    posterImage:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=700&auto=format&fit=crop&q=80",
    format: "4DX",
    isNowShowing: true,
    rating: "89%",
    duration: "1h 58m",
    languages: "Action / Thriller • Japanese Sub",
    showtimes: "12 Showtimes Today",
    genre: "Action",
    bookLink: "#book-seats",
    trailerLink: "#watch-trailer",
  },
];

const GENRE_OPTIONS = [
  "All",
  "Sci-Fi",
  "Action",
  "Drama",
  "Musical",
  "Thriller",
];

/**
 * TrendingBlockbusters Component
 * Section featuring movie cards rendered via array map, Swiper slider, and genre filtering.
 */
export default function TrendingBlockbusters({
  movies = DEFAULT_MOVIES,
  title = "Trending Blockbusters",
  badge = "IN THEATERS NOW",
  seeAllText = "See all (24)",
  seeAllLink = "#",
  className = "",
}) {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Unique IDs for Swiper custom navigation buttons
  const prevButtonId = "trending-swiper-prev";
  const nextButtonId = "trending-swiper-next";

  // Filter movies based on selected genre
  const filteredMovies = useMemo(() => {
    if (selectedGenre === "All") return movies;
    return movies.filter(
      (m) =>
        m.genre?.toLowerCase() === selectedGenre.toLowerCase() ||
        m.languages?.toLowerCase().includes(selectedGenre.toLowerCase())
    );
  }, [movies, selectedGenre]);

  return (
    <section
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16 ${className}`}
    >
      {/* 1. Reusable Section Header Component */}
      <SectionHeader
        badge={badge}
        title={title}
        filterOptions={GENRE_OPTIONS}
        activeFilter={selectedGenre}
        onFilterSelect={(genre) => setSelectedGenre(genre)}
        seeAllText={seeAllText}
        seeAllLink={seeAllLink}
        prevButtonId={prevButtonId}
        nextButtonId={nextButtonId}
      />

      {/* 2. Swiper Slider with Mapped MovieCard Components */}
      <div className="relative mt-2">
        {isMounted ? (
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: `#${prevButtonId}`,
              nextEl: `#${nextButtonId}`,
            }}
            spaceBetween={16}
            slidesPerView={1.2}
            grabCursor={true}
            breakpoints={{
              480: {
                slidesPerView: 1.6,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2.2,
                spaceBetween: 18,
              },
              840: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="pb-2 overflow-visible"
          >
            {filteredMovies.map((movie) => (
              <SwiperSlide key={movie.id} className="h-auto">
                <MovieCard movie={movie} className="h-full" />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMovies.slice(0, 4).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {filteredMovies.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-sm">
            No blockbusters found for the &quot;{selectedGenre}&quot; genre.
          </div>
        )}
      </div>
    </section>
  );
}
