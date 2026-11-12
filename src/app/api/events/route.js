import { NextResponse } from "next/server";
import { EVENTS } from "@/data/apiData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const city = searchParams.get("city");
  const id = searchParams.get("id");

  if (id) {
    const event = EVENTS.find((e) => e.id === id);
    if (!event) {
      return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: event });
  }

  let filtered = [...EVENTS];

  if (category && category !== "all") {
    filtered = filtered.filter((e) => e.categoryType.toLowerCase() === category.toLowerCase());
  }

  if (city && city !== "all") {
    filtered = filtered.filter((e) => e.city.toLowerCase().includes(city.toLowerCase()));
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    data: filtered,
  });
}

