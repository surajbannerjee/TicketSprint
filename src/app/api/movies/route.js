import { NextResponse } from "next/server";
import { MOVIES, UPCOMING_MOVIES } from "@/data/apiData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type"); // "upcoming" | "now-showing" | null
  const genre = searchParams.get("genre");
  const format = searchParams.get("format");
  const id = searchParams.get("id");

  if (id) {
    const movie = MOVIES.find((m) => m.id === id);
    if (!movie) {
      return NextResponse.json({ success: false, message: "Movie not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: movie });
  }

  if (type === "upcoming") {
    return NextResponse.json({
      success: true,
      total: UPCOMING_MOVIES.length,
      data: UPCOMING_MOVIES,
    });
  }

  let filtered = [...MOVIES];

  if (genre && genre !== "all") {
    filtered = filtered.filter((m) => m.genre.toLowerCase() === genre.toLowerCase());
  }

  if (format && format !== "all") {
    filtered = filtered.filter((m) => m.format.toLowerCase() === format.toLowerCase());
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    data: filtered,
  });
}
