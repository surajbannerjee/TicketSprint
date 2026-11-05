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
      "https://www.movy.sx/img/w342/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg/q50.webp",
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
      "https://www.movy.sx/img/w342/bR8ISy1O9XQxqiy0fQFw2BX72RQ.jpg/q50.webp",
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
      "https://www.movy.sx/img/w342/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg/q50.webp",
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
      "https://www.movy.sx/img/w342/gaet1xQ2nxrG0V1Ep9T20ZMNEIC.jpg/q50.webp",
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
      "https://www.movy.sx/img/w342/qJ2tW6WMUDux911r6m7haRef0WH.jpg/q50.webp",
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
      "https://www.movy.sx/img/w342/6Ryitt95xrO8KXuqRGm1fUuNwqF.jpg/q50.webp",
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
      className={`w-full max-w-[1440px] mx-auto mx-auto px-4 sm:px-6 lg:px-8 lg:py-15 py-5 ${className}`}
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
      <div className="relative">
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
            className="pt-5! overflow-visible"
          >
            {filteredMovies.map((movie) => (
              <SwiperSlide key={movie.id} className="!h-auto flex items-stretch">
                <MovieCard movie={movie} className="w-full h-full" />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
            {filteredMovies.slice(0, 4).map((movie) => (
              <MovieCard key={movie.id} movie={movie} className="w-full h-full" />
            ))}
          </div>
        )}

        {filteredMovies.length === 0 && (
          <div className="py-12 text-center text-pinkT text-sm">
            No blockbusters found for the &quot;{selectedGenre}&quot; genre.
          </div>
        )}
      </div>
    </section>
  );
}
