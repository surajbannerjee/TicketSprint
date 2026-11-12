"use client";

import React, { useState, useMemo, useEffect } from "react";
import SectionHeader from "@/components/Common/SectionHeader";
import MovieCard from "@/components/Common/MovieCard";
import { MOVIES } from "@/data/apiData";

// Swiper React components & styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const GENRE_OPTIONS = [
  "All",
  "Sci-Fi",
  "Action",
  "Drama",
  "Musical",
  "Thriller",
];

export default function TrendingBlockbusters({
  title = "Trending Blockbusters",
  badge = "IN THEATERS NOW",
  seeAllText = "See all",
  seeAllLink = "/movies",
  className = "",
}) {
  const [moviesList, setMoviesList] = useState(MOVIES);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch movies dynamically from /api/movies
  useEffect(() => {
    setIsMounted(true);
    async function fetchMovies() {
      try {
        setLoading(true);
        const res = await fetch("/api/movies");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setMoviesList(json.data);
          }
        }
      } catch (e) {
        console.warn("API movies fetch error, using fallback:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  // Unique IDs for Swiper custom navigation buttons
  const prevButtonId = "trending-swiper-prev";
  const nextButtonId = "trending-swiper-next";

  // Filter movies based on selected genre
  const filteredMovies = useMemo(() => {
    if (selectedGenre === "All") return moviesList;
    return moviesList.filter(
      (m) =>
        m.genre?.toLowerCase() === selectedGenre.toLowerCase() ||
        m.languages?.toLowerCase().includes(selectedGenre.toLowerCase())
    );
  }, [moviesList, selectedGenre]);

  return (
    <section
      className={`w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 lg:py-15 py-5 ${className}`}
    >
      {/* 1. Reusable Section Header Component */}
      <SectionHeader
        badge={badge}
        title={title}
        filterOptions={GENRE_OPTIONS}
        activeFilter={selectedGenre}
        onFilterSelect={(genre) => setSelectedGenre(genre)}
        seeAllText={seeAllText}
        seeAllLink="/movies"
        prevButtonId={prevButtonId}
        nextButtonId={nextButtonId}
      />

      {/* 2. Swiper Carousel or Loading State */}
      <div className="relative w-full">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="aspect-[2/3] rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : isMounted ? (
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: `#${prevButtonId}`,
              nextEl: `#${nextButtonId}`,
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={filteredMovies.length > 5}
            spaceBetween={16}
            slidesPerView={1.2}
            breakpoints={{
              380: {
                slidesPerView: 1.6,
                spaceBetween: 14,
              },
              480: {
                slidesPerView: 2.2,
                spaceBetween: 14,
              },
              640: {
                slidesPerView: 2.8,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 3.5,
                spaceBetween: 18,
              },
              1024: {
                slidesPerView: 4.2,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 5, // Exactly 5 cards visible on desktop matching user screenshot
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 5,
                spaceBetween: 22,
              },
            }}
            className="w-full !overflow-visible md:!overflow-hidden"
          >
            {filteredMovies.map((movie) => (
              <SwiperSlide key={movie.id} className="h-auto">
                <MovieCard movie={movie} className="h-full" />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMovies.slice(0, 5).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
