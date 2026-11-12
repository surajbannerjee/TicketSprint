import { NextResponse } from "next/server";
import { fetchTmdbNowPlaying, fetchTmdbTopRated, fetchTmdbUpcoming, isTmdbConfigured } from "@/lib/tmdb";
import { MOVIES, TOP_RATED_MOVIES, CLASSIC_OLD_MOVIES, UPCOMING_MOVIES } from "@/data/apiData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type"); // "upcoming" | "top-rated" | "classic-old" | "now-showing" | null
  const genre = searchParams.get("genre");
  const format = searchParams.get("format");
  const id = searchParams.get("id");

  // Single movie lookup across all sections
  if (id) {
    const allMovies = [
      ...(await fetchTmdbNowPlaying()),
      ...(await fetchTmdbTopRated()),
      ...CLASSIC_OLD_MOVIES,
      ...MOVIES,
    ];
    let movie = allMovies.find((m) => m.id === id || String(m.tmdbId) === String(id));
    if (!movie) {
      // Fuzzy matching by slug/title
      const normalizedQuery = id.toLowerCase().replace(/[^a-z0-9]/g, "");
      movie = allMovies.find((m) => {
        const normTitle = (m.title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        const normId = (m.id || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        return normTitle.includes(normalizedQuery) || normId.includes(normalizedQuery) || normalizedQuery.includes(normId);
      });
    }

    if (!movie) {
      // Generate clean dynamic movie object from slug if not matched
      const fallbackTitle = id
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      movie = {
        id: id,
        title: fallbackTitle,
        posterImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80",
        backdropImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1440&auto=format&fit=crop&q=80",
        format: "IMAX",
        category: "now-showing",
        isNowShowing: true,
        rating: "92%",
        duration: "2h 15m",
        languages: "English • Hindi • Bengali Sub",
        showtimes: "10 Showtimes Today",
        genre: "Blockbuster",
        criticScore: "90%",
        imdbRating: "8.1",
        synopsis: `Experience ${fallbackTitle} in breathtaking IMAX laser clarity, Dolby Atmos audio, and luxury recliner seating.`,
        bookLink: `/seat-selection?movie=${id}`,
        trailerLink: `/movies/${id}#trailer`,
        priceRange: "₹250 - ₹550",
      };
    }
    return NextResponse.json({ success: true, isTmdb: isTmdbConfigured(), data: movie });
  }

  // Upcoming Movies
  if (type === "upcoming") {
    const upcomingList = await fetchTmdbUpcoming();
    return NextResponse.json({
      success: true,
      isTmdb: isTmdbConfigured(),
      total: upcomingList.length,
      data: upcomingList,
    });
  }

  // Top Rated All-Time Masterpieces
  if (type === "top-rated") {
    const topRated = await fetchTmdbTopRated();
    return NextResponse.json({
      success: true,
      isTmdb: isTmdbConfigured(),
      total: topRated.length,
      data: topRated,
    });
  }

  // Old Classic & Vintage Movies
  if (type === "classic-old" || type === "old") {
    return NextResponse.json({
      success: true,
      total: CLASSIC_OLD_MOVIES.length,
      data: CLASSIC_OLD_MOVIES,
    });
  }

  // Now Playing Movies (live from TMDB if key set)
  let moviesList = await fetchTmdbNowPlaying();

  if (genre && genre !== "all") {
    moviesList = moviesList.filter((m) => m.genre.toLowerCase() === genre.toLowerCase());
  }

  if (format && format !== "all") {
    moviesList = moviesList.filter((m) => m.format.toLowerCase() === format.toLowerCase());
  }

  return NextResponse.json({
    success: true,
    isTmdb: isTmdbConfigured(),
    total: moviesList.length,
    data: moviesList,
  });
}
