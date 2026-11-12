import { NextResponse } from "next/server";
import { CINEMAS } from "@/data/apiData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const tech = searchParams.get("tech"); // "imax" | "dolby" | "all"
  const sort = searchParams.get("sort"); // "price-asc" | "price-desc"
  const search = searchParams.get("search");
  const id = searchParams.get("id");

  if (id) {
    const cinema = CINEMAS.find((c) => c.id === id);
    if (!cinema) {
      return NextResponse.json({ success: false, message: "Cinema not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: cinema });
  }

  let filtered = [...CINEMAS];

  if (city && city !== "all") {
    filtered = filtered.filter((c) => c.city.toLowerCase().includes(city.toLowerCase()));
  }

  if (tech && tech !== "all") {
    filtered = filtered.filter((c) => c.formatBadge.toLowerCase().includes(tech.toLowerCase()));
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.amenities.some((a) => a.toLowerCase().includes(q))
    );
  }

  if (sort === "price-asc") {
    filtered.sort((a, b) => a.cheapestPrice - b.cheapestPrice);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.cheapestPrice - a.cheapestPrice);
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    data: filtered,
  });
}

