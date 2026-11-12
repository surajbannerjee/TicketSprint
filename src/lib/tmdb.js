/**
 * TMDB API Client Utility
 * Seamless integration with The Movie Database API
 * Supports both API Key (v3) and Bearer Access Token (v4).
 * Gracefully falls back to high-res curated data if key is not yet set.
 */

import { MOVIES, UPCOMING_MOVIES } from "@/data/apiData";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY || "";
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN || "";
const TMDB_IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE || "https://image.tmdb.org/t/p";

// TMDB Genre ID to Name Mapping
const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Musical",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

/**
 * Helper to build fetch options with Authorization headers if Bearer token present
 */
function getFetchOptions() {
  const headers = {
    "Content-Type": "application/json",
  };
  if (TMDB_ACCESS_TOKEN && TMDB_ACCESS_TOKEN !== "your_tmdb_api_key_here") {
    headers["Authorization"] = `Bearer ${TMDB_ACCESS_TOKEN}`;
  }
  return { headers, next: { revalidate: 3600 } }; // Cache for 1 hr
}

/**
 * Check if a valid TMDB key or token is configured
 */
export function isTmdbConfigured() {
  return (
    (Boolean(TMDB_API_KEY) && TMDB_API_KEY !== "your_tmdb_api_key_here") ||
    (Boolean(TMDB_ACCESS_TOKEN) && TMDB_ACCESS_TOKEN !== "your_tmdb_api_key_here")
  );
}

/**
 * Map TMDB raw movie item to TicketSprint unified schema
 */
function transformTmdbMovie(item, format = "IMAX") {
  const posterPath = item.poster_path
    ? `${TMDB_IMAGE_BASE}/w500${item.poster_path}`
    : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80";

  const backdropPath = item.backdrop_path
    ? `${TMDB_IMAGE_BASE}/original${item.backdrop_path}`
    : "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1440&auto=format&fit=crop&q=80";

  const primaryGenre =
    item.genre_ids && item.genre_ids.length > 0
      ? GENRE_MAP[item.genre_ids[0]] || "Sci-Fi"
      : "Blockbuster";

  const ratingPct = item.vote_average
    ? `${Math.round(item.vote_average * 10)}%`
    : "92%";

  // Slugified movie id
  const slugId = item.title
    ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : `movie-${item.id}`;

  return {
    id: slugId,
    tmdbId: item.id,
    title: item.title || item.original_title,
    posterImage: posterPath,
    backdropImage: backdropPath,
    format: format,
    isNowShowing: true,
    rating: ratingPct,
    criticScore: ratingPct,
    imdbRating: item.vote_average ? item.vote_average.toFixed(1) : "8.5",
    duration: "2h 25m",
    languages: "English • Hindi • Bengali Sub",
    showtimes: "12 Showtimes Today",
    genre: primaryGenre,
    synopsis: item.overview || "Experience this cinematic masterpiece in high-definition IMAX and Dolby Atmos.",
    bookLink: `/movies/dune-part-two`,
    trailerLink: "#watch-trailer",
    priceRange: "₹220 - ₹550",
    releaseDate: item.release_date,
    popularity: item.popularity,
  };
}

/**
 * Fetch Now Playing / Trending Movies from TMDB
 */
export async function fetchTmdbNowPlaying() {
  if (!isTmdbConfigured()) {
    return MOVIES;
  }

  try {
    const url = new URL(`${TMDB_BASE_URL}/movie/now_playing`);
    if (TMDB_API_KEY && TMDB_API_KEY !== "your_tmdb_api_key_here") {
      url.searchParams.set("api_key", TMDB_API_KEY);
    }
    url.searchParams.set("language", "en-US");
    url.searchParams.set("page", "1");

    const res = await fetch(url.toString(), getFetchOptions());
    if (!res.ok) {
      console.warn(`TMDB now_playing returned ${res.status}, falling back to curated list.`);
      return MOVIES;
    }

    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      return MOVIES;
    }

    const formats = ["IMAX", "4DX", "Dolby", "ScreenX", "VIP"];
    return data.results.slice(0, 10).map((item, idx) =>
      transformTmdbMovie(item, formats[idx % formats.length])
    );
  } catch (err) {
    console.error("Error fetching from TMDB now_playing:", err);
    return MOVIES;
  }
}

/**
 * Fetch Upcoming Movies from TMDB for Fan Anticipation Meter
 */
export async function fetchTmdbUpcoming() {
  if (!isTmdbConfigured()) {
    return UPCOMING_MOVIES;
  }

  try {
    const url = new URL(`${TMDB_BASE_URL}/movie/upcoming`);
    if (TMDB_API_KEY && TMDB_API_KEY !== "your_tmdb_api_key_here") {
      url.searchParams.set("api_key", TMDB_API_KEY);
    }
    url.searchParams.set("language", "en-US");
    url.searchParams.set("page", "1");

    const res = await fetch(url.toString(), getFetchOptions());
    if (!res.ok) {
      console.warn(`TMDB upcoming returned ${res.status}, falling back.`);
      return UPCOMING_MOVIES;
    }

    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      return UPCOMING_MOVIES;
    }

    const meterThemes = ["emerald", "indigo", "pink"];

    return data.results.slice(0, 3).map((item, idx) => {
      const slugId = item.title
        ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
        : `upcoming-${item.id}`;

      return {
        id: slugId,
        tmdbId: item.id,
        title: item.title,
        meta: `${item.release_date || "Coming Soon"} • ${GENRE_MAP[item.genre_ids?.[0]] || "Blockbuster"}`,
        image: item.backdrop_path
          ? `${TMDB_IMAGE_BASE}/w780${item.backdrop_path}`
          : item.poster_path
          ? `${TMDB_IMAGE_BASE}/w780${item.poster_path}`
          : "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=780&auto=format&fit=crop&q=80",
        releaseBadge: item.release_date ? `RELEASES: ${item.release_date}` : "COMING SOON",
        badgeColor: idx === 0 ? "pink" : idx === 1 ? "blue" : "dark",
        fansWaiting: `${Math.round((item.popularity || 45) * 120)} fans waiting`,
        buzzIndex: Math.min(Math.round((item.vote_average || 8) * 10 + 15), 99),
        meterTheme: meterThemes[idx % meterThemes.length],
        genre: GENRE_MAP[item.genre_ids?.[0]] || "Cinema",
      };
    });
  } catch (err) {
    console.error("Error fetching from TMDB upcoming:", err);
    return UPCOMING_MOVIES;
  }
}

