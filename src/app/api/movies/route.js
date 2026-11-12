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
    const movie = allMovies.find((m) => m.id === id);
    if (!movie) {
      return NextResponse.json({ success: false, message: "Movie not found" }, { status: 404 });
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
