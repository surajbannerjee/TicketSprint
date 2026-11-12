import { NextResponse } from "next/server";
import { fetchTmdbNowPlaying, fetchTmdbUpcoming, isTmdbConfigured } from "@/lib/tmdb";
import { MOVIES, UPCOMING_MOVIES } from "@/data/apiData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type"); // "upcoming" | "now-showing" | null
  const genre = searchParams.get("genre");
  const format = searchParams.get("format");
  const id = searchParams.get("id");

  // Single movie lookup
  if (id) {
    const allMovies = await fetchTmdbNowPlaying();
    const movie = allMovies.find((m) => m.id === id) || MOVIES.find((m) => m.id === id);
    if (!movie) {
      return NextResponse.json({ success: false, message: "Movie not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, isTmdb: isTmdbConfigured(), data: movie });
  }

  // Upcoming Buzz movies
  if (type === "upcoming") {
    const upcomingList = await fetchTmdbUpcoming();
    return NextResponse.json({
      success: true,
      isTmdb: isTmdbConfigured(),
      total: upcomingList.length,
      data: upcomingList,
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
